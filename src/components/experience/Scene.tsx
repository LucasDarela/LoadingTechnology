"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { chapters } from "@/lib/chapters";
import { experience } from "@/lib/experience";
import { buildShapes } from "./shapes";

// Escala e opacidade da nuvem por capítulo. No hero o spinner é grande e
// discreto, emoldurando o título.
const SCALE = [1.3, 0.9, 1, 1, 1, 1.3];
const OPACITY = [0.95, 0.85, 1, 1, 0.9, 0.6];

const RING_COUNT = 12;
const RING_SPACING = 7;
const TUNNEL = RING_COUNT * RING_SPACING;
const STAR_DEPTH = 90;

const cloudVertex = /* glsl */ `
  attribute vec3 aS1;
  attribute vec3 aS2;
  attribute vec3 aS3;
  attribute vec3 aS4;
  attribute vec3 aS5;
  attribute vec3 aRand;
  attribute float aBar;
  uniform float uMorph;
  uniform float uTime;
  uniform float uSpin;
  uniform float uRotY;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uAgitation;
  varying float vAlpha;
  varying float vTint;

  vec2 rot(vec2 p, float a) {
    float s = sin(a), c = cos(a);
    return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  }

  float weight(float k) { return max(0.0, 1.0 - abs(uMorph - k)); }

  void main() {
    vec3 s0 = position; s0.xy = rot(s0.xy, -uSpin);
    vec3 s5 = aS5;      s5.xy = rot(s5.xy, -uSpin);
    vec3 s1 = aS1;      s1.xz = rot(s1.xz, uRotY);
    vec3 s2 = aS2;      s2.xz = rot(s2.xz, uRotY * 0.8 + 0.6); s2.yz = rot(s2.yz, 0.45);
    vec3 s3 = aS3;      s3.xz = rot(s3.xz, sin(uTime * 0.35) * 0.3 - 0.25);
    vec3 s4 = aS4;      s4.xz = rot(s4.xz, sin(uTime * 0.4) * 0.35);

    float w0 = weight(0.0), w1 = weight(1.0), w2 = weight(2.0);
    float w3 = weight(3.0), w4 = weight(4.0), w5 = weight(5.0);
    vec3 p = s0 * w0 + s1 * w1 + s2 * w2 + s3 * w3 + s4 * w4 + s5 * w5;

    // No meio da transição os pontos se dispersam e voltam a se reunir.
    float t = fract(uMorph);
    float burst = sin(3.14159265 * t);
    p += aRand * (burst * 1.8 + uAgitation);

    // Respiração contínua, para a forma nunca parecer congelada.
    // No spinner ela é mínima, para as barras do logo ficarem nítidas.
    float spinnerW = w0 + w5;
    p += mix(0.035, 0.008, spinnerW) * vec3(
      sin(uTime * 1.3 + aRand.x * 11.0),
      cos(uTime * 1.1 + aRand.y * 13.0),
      sin(uTime * 0.9 + aRand.z * 17.0)
    );

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float jitter = 0.6 + fract(aRand.x * 43.7) * 0.9;
    gl_PointSize = uSize * uPixelRatio * mix(jitter, 0.85, spinnerW) * (1.0 + burst * 0.6) / -mv.z;

    vAlpha = mix(1.0, 0.28 + 0.72 * aBar, spinnerW);
    vTint = fract(aRand.y * 7.31 + aRand.z * 3.1);
  }
`;

const pointFragment = /* glsl */ `
  uniform float uOpacity;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;
  varying float vTint;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 col = mix(uColorA, uColorB, vTint);
    gl_FragColor = vec4(col, a * vAlpha * uOpacity);
  }
`;

const starVertex = /* glsl */ `
  attribute vec3 aRand;
  uniform float uTravel;
  uniform float uCamZ;
  uniform float uDepth;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uSpeed;
  varying float vAlpha;
  varying float vTint;

  void main() {
    vec3 p = position;
    // As estrelas vêm em direção à câmera e reaparecem no fundo do túnel.
    float d = mod(p.z + uTravel, uDepth);
    p.z = uCamZ - uDepth + d;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.5 + aRand.x) * (1.0 + uSpeed) / -mv.z;
    vAlpha = smoothstep(0.0, uDepth * 0.35, d) * (1.0 - smoothstep(uDepth - 6.0, uDepth - 1.0, d));
    vAlpha *= 0.35 + aRand.y * 0.65;
    vTint = aRand.z;
  }
`;

const ringVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragment = /* glsl */ `
  uniform float uRadius;
  uniform float uSize;
  uniform float uWidth;
  uniform float uOpacity;
  uniform float uPhase;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float d = length(p);
    float core = exp(-pow((d - uRadius) / uWidth, 2.0));
    float glow = exp(-pow((d - uRadius) / (uWidth * 9.0), 2.0)) * 0.3;
    float ang = atan(p.y, p.x);
    float variation = 0.55 + 0.45 * sin(ang * 2.0 + uPhase);
    gl_FragColor = vec4(uColor, (core + glow) * variation * uOpacity);
  }
`;

const lineVertex = /* glsl */ `
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lineFragment = /* glsl */ `
  uniform float uOpacity;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(uColor, vAlpha * uOpacity);
  }
`;

const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt));

export default function Scene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      // Sem WebGL: o gradiente em CSS por trás do canvas segura o visual.
      experience.sceneReady = true;
      return;
    }

    const mobile = window.innerWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio, mobile ? 1.5 : 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 8);

    const colorA = new THREE.Color("#4f7dff");
    const colorB = new THREE.Color("#dce9ff");
    const neon = new THREE.Color("#245de7");

    // --- Nuvem que se transforma a cada capítulo -------------------------
    const count = mobile ? 4000 : 8000;
    const shapes = buildShapes(count);
    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute("position", new THREE.BufferAttribute(shapes.targets[0], 3));
    shapes.targets.slice(1).forEach((t, i) => cloudGeo.setAttribute(`aS${i + 1}`, new THREE.BufferAttribute(t, 3)));
    cloudGeo.setAttribute("aRand", new THREE.BufferAttribute(shapes.random, 3));
    cloudGeo.setAttribute("aBar", new THREE.BufferAttribute(shapes.bar, 1));
    const cloudMat = new THREE.ShaderMaterial({
      vertexShader: cloudVertex,
      fragmentShader: pointFragment,
      uniforms: {
        uMorph: { value: 0 },
        uTime: { value: 0 },
        uSpin: { value: 0 },
        uRotY: { value: 0 },
        uSize: { value: mobile ? 34 : 30 },
        uPixelRatio: { value: pixelRatio },
        uAgitation: { value: 0 },
        uOpacity: { value: 0 },
        uColorA: { value: colorA },
        uColorB: { value: colorB },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const cloud = new THREE.Points(cloudGeo, cloudMat);
    cloud.frustumCulled = false;
    scene.add(cloud);

    // --- Estrelas ----------------------------------------------------------
    const starCount = mobile ? 1500 : 3000;
    const starPos = new Float32Array(starCount * 3);
    const starRand = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.pow(Math.random(), 0.7) * 22;
      starPos[i * 3] = Math.cos(a) * r;
      starPos[i * 3 + 1] = Math.sin(a) * r;
      starPos[i * 3 + 2] = Math.random() * STAR_DEPTH;
      starRand[i * 3] = Math.random();
      starRand[i * 3 + 1] = Math.random();
      starRand[i * 3 + 2] = Math.random();
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("aRand", new THREE.BufferAttribute(starRand, 3));
    const starMat = new THREE.ShaderMaterial({
      vertexShader: starVertex,
      fragmentShader: pointFragment,
      uniforms: {
        uTravel: { value: 0 },
        uCamZ: { value: camera.position.z },
        uDepth: { value: STAR_DEPTH },
        uSize: { value: 26 },
        uPixelRatio: { value: pixelRatio },
        uSpeed: { value: 0 },
        uOpacity: { value: 0 },
        uColorA: { value: colorA },
        uColorB: { value: colorB },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    stars.frustumCulled = false;
    scene.add(stars);

    // --- Anéis do túnel ----------------------------------------------------
    const ringRadius = 4.6;
    const ringSize = (ringRadius + 2) * 2;
    const ringGeo = new THREE.PlaneGeometry(ringSize, ringSize);
    const rings = Array.from({ length: RING_COUNT }, (_, i) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader: ringVertex,
        fragmentShader: ringFragment,
        uniforms: {
          uRadius: { value: ringRadius * (0.92 + ((i * 37) % 10) / 60) },
          uSize: { value: ringSize },
          uWidth: { value: 0.035 },
          uOpacity: { value: 0 },
          uPhase: { value: i * 1.7 },
          uColor: { value: colorA },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(ringGeo, mat);
      mesh.rotation.z = i * 0.9;
      scene.add(mesh);
      return mesh;
    });

    // --- Raios de luz do hero ----------------------------------------------
    const rayCount = 70;
    const rayPos = new Float32Array(rayCount * 6);
    const rayAlpha = new Float32Array(rayCount * 2);
    for (let i = 0; i < rayCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r0 = 0.6 + Math.random() * 1.5;
      const r1 = 9 + Math.random() * 12;
      rayPos.set([Math.cos(a) * r0, Math.sin(a) * r0, -20, Math.cos(a) * r1, Math.sin(a) * r1, 2], i * 6);
      rayAlpha.set([0, 0.25 + Math.random() * 0.5], i * 2);
    }
    const rayGeo = new THREE.BufferGeometry();
    rayGeo.setAttribute("position", new THREE.BufferAttribute(rayPos, 3));
    rayGeo.setAttribute("aAlpha", new THREE.BufferAttribute(rayAlpha, 1));
    const rayMat = new THREE.ShaderMaterial({
      vertexShader: lineVertex,
      fragmentShader: lineFragment,
      uniforms: { uOpacity: { value: 0 }, uColor: { value: neon } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const rays = new THREE.LineSegments(rayGeo, rayMat);
    scene.add(rays);

    // --- Loop --------------------------------------------------------------
    const reduce = experience.reducedMotion;
    let last = performance.now();
    const state = { morph: experience.morph, travel: 0, side: 0, scale: SCALE[0], intro: 0, px: 0, py: 0, speed: 0 };
    const sides = chapters.map((c) => c.side);
    let time = 0;

    const halfWidth = () => camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
    const lerpChapter = (arr: readonly number[], m: number) => {
      const i = Math.min(Math.floor(m), arr.length - 1);
      const j = Math.min(i + 1, arr.length - 1);
      return arr[i] + (arr[j] - arr[i]) * (m - i);
    };

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 1 / 20);
      last = now;
      time += reduce ? dt * 0.25 : dt;

      state.morph = damp(state.morph, experience.morph, 5, dt);
      const drift = reduce ? 0 : time * 0.8;
      state.travel = damp(state.travel, experience.progress * 70, 4, dt);
      state.speed = damp(state.speed, Math.min(Math.abs(experience.velocity) / 40, 1.2), 3, dt);
      state.intro = damp(state.intro, 1, 1.4, dt);

      const narrow = window.innerWidth < 900;
      const side = narrow ? 0 : lerpChapter(sides, state.morph) * halfWidth() * 0.45;
      state.side = damp(state.side, side, 4, dt);
      state.scale = damp(state.scale, lerpChapter(SCALE, state.morph) * (narrow ? 0.72 : 1), 4, dt);
      const opacity = lerpChapter(OPACITY, state.morph) * (narrow ? 0.6 : 1);

      // Paralaxe do ponteiro, suavizada para parecer peso e não rastreamento.
      if (!reduce) {
        state.px = damp(state.px, experience.pointer.x, 2.5, dt);
        state.py = damp(state.py, experience.pointer.y, 2.5, dt);
      }
      camera.position.x = state.px * 0.45;
      camera.position.y = -state.py * 0.3;
      camera.lookAt(state.side * 0.15, 0, 0);

      cloud.position.x = state.side;
      cloud.scale.setScalar(state.scale * (0.85 + 0.15 * state.intro));
      const u = cloudMat.uniforms;
      u.uMorph.value = state.morph;
      u.uTime.value = time;
      u.uSpin.value = time * ((Math.PI * 2) / 12); // uma volta a cada 12s
      u.uRotY.value = time * 0.18;
      u.uAgitation.value = state.speed * 0.35 + (1 - state.intro) * 3;
      u.uOpacity.value = opacity * state.intro;

      const travel = state.travel + drift;
      starMat.uniforms.uTravel.value = travel;
      starMat.uniforms.uSpeed.value = state.speed;
      starMat.uniforms.uOpacity.value = state.intro;

      const heroFade = 1 - Math.min(state.morph, 1);
      rayMat.uniforms.uOpacity.value = heroFade * state.intro * 0.55;
      rays.rotation.z = time * 0.02;

      for (let i = 0; i < RING_COUNT; i++) {
        // a distância até a câmera diminui conforme o scroll avança
        const ahead = TUNNEL - ((i * RING_SPACING + travel * 0.9) % TUNNEL);
        rings[i].position.z = camera.position.z - ahead;
        const fadeIn = THREE.MathUtils.smoothstep(TUNNEL - ahead, 0, TUNNEL * 0.5);
        const fadeOut = THREE.MathUtils.smoothstep(ahead, 1, 6);
        const mat = rings[i].material as THREE.ShaderMaterial;
        mat.uniforms.uOpacity.value = fadeIn * fadeOut * state.intro * (0.55 + state.speed * 0.6);
        mat.uniforms.uPhase.value = i * 1.7 + time * 0.3;
      }

      renderer.render(scene, camera);
      if (!experience.sceneReady) experience.sceneReady = true;
    };

    const start = () => renderer.setAnimationLoop(tick);
    const stop = () => renderer.setAnimationLoop(null);
    start();

    const onVisibility = () => {
      if (document.hidden) stop();
      else {
        last = performance.now();
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      cloudGeo.dispose();
      cloudMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      ringGeo.dispose();
      rings.forEach((r) => (r.material as THREE.Material).dispose());
      rayGeo.dispose();
      rayMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden className="fixed inset-0 z-0 pointer-events-none" />;
}
