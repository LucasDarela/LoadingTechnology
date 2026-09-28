// Gera as posições-alvo da nuvem de partículas, uma forma por capítulo.
// Todas as formas têm o mesmo número de pontos para que o shader possa
// interpolar ponto a ponto entre elas.

type Rand = () => number;

// PRNG determinístico: a nuvem fica igual a cada visita.
function mulberry32(seed: number): Rand {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Spinner de 12 barras do logo da Loading. Devolve também a opacidade de cada barra. */
function spinner(n: number, rand: Rand) {
  const pos = new Float32Array(n * 3);
  const bar = new Float32Array(n);
  // Mesmas proporções do SVG do logo: barras de y=15 a y=35, largura 8, raio 50.
  const inner = 1.0;
  const outer = 2.33;
  const half = 0.27;
  for (let i = 0; i < n; i++) {
    const b = i % 12;
    const angle = (b * Math.PI) / 6; // sentido horário a partir do topo, como no SVG
    let u = 0;
    let v = 0;
    if (rand() < 0.4) {
      // 40% dos pontos desenham o contorno da pílula, o que deixa a barra nítida.
      if (rand() < 0.7) {
        u = rand() < 0.5 ? -half : half;
        v = inner + half + rand() * (outer - inner - half * 2);
      } else {
        const a = rand() * Math.PI;
        const top = rand() < 0.5;
        u = Math.cos(a) * half;
        v = top ? outer - half + Math.sin(a) * half : inner + half - Math.sin(a) * half;
      }
    } else {
      // O resto preenche o interior da pílula (retângulo com pontas arredondadas).
      for (let tries = 0; tries < 12; tries++) {
        u = (rand() * 2 - 1) * half;
        v = inner + rand() * (outer - inner);
        const capCenter = v < inner + half ? inner + half : v > outer - half ? outer - half : v;
        if (Math.hypot(u, v - capCenter) <= half) break;
      }
    }
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    pos[i * 3] = u * c + v * s;
    pos[i * 3 + 1] = -u * s + v * c;
    pos[i * 3 + 2] = (rand() - 0.5) * 0.06;
    bar[i] = (b + 1) / 12;
  }
  return { pos, bar };
}

function sphere(n: number, rand: Rand) {
  const pos = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    // 85% na superfície, o resto preenche o núcleo
    const radius = rand() < 0.85 ? 2.2 : 2.2 * Math.cbrt(rand()) * 0.8;
    pos[i * 3] = Math.cos(theta) * r * radius;
    pos[i * 3 + 1] = y * radius;
    pos[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return pos;
}

/** Treliça 3x3x3: estrutura, sistema, ERP. */
function lattice(n: number, rand: Rand) {
  const pos = new Float32Array(n * 3);
  const size = 1.55;
  const grid = [-size, -size / 3, size / 3, size];
  for (let i = 0; i < n; i++) {
    const axis = Math.floor(rand() * 3);
    const a = grid[Math.floor(rand() * 4)];
    const b = grid[Math.floor(rand() * 4)];
    const t = (rand() * 2 - 1) * size;
    const p = axis === 0 ? [t, a, b] : axis === 1 ? [a, t, b] : [a, b, t];
    pos[i * 3] = p[0];
    pos[i * 3 + 1] = p[1];
    pos[i * 3 + 2] = p[2];
  }
  return pos;
}

type Segment = [number, number, number, number];

/** Janela de navegador com layout de landing page. */
function browser(n: number, rand: Rand) {
  const pos = new Float32Array(n * 3);
  const w = 2.3;
  const h = 1.5;
  const rect = (x0: number, y0: number, x1: number, y1: number): Segment[] => [
    [x0, y0, x1, y0],
    [x1, y0, x1, y1],
    [x1, y1, x0, y1],
    [x0, y1, x0, y0],
  ];
  const segments: Segment[] = [
    ...rect(-w, -h, w, h),
    [-w, h - 0.34, w, h - 0.34],
    ...rect(-1.9, 0.05, 0.2, 0.75), // bloco do hero
    [-1.9, -0.25, 0.9, -0.25],
    [-1.9, -0.5, 0.4, -0.5],
    [-1.9, -0.75, 0.6, -0.75],
    ...rect(0.6, -1.15, 1.9, 0.75), // imagem
    ...rect(-1.9, -1.2, -0.9, -0.95), // botão
  ];
  const circles: [number, number, number][] = [
    [-w + 0.25, h - 0.17, 0.07],
    [-w + 0.47, h - 0.17, 0.07],
    [-w + 0.69, h - 0.17, 0.07],
  ];
  const lengths = segments.map(([x0, y0, x1, y1]) => Math.hypot(x1 - x0, y1 - y0));
  const circleLen = circles.map(([, , r]) => Math.PI * 2 * r * 2);
  const all = [...lengths, ...circleLen];
  const total = all.reduce((a, b) => a + b, 0);

  for (let i = 0; i < n; i++) {
    let pick = rand() * total;
    let k = 0;
    while (pick > all[k] && k < all.length - 1) pick -= all[k++];
    let x: number;
    let y: number;
    if (k < segments.length) {
      const [x0, y0, x1, y1] = segments[k];
      const t = rand();
      x = x0 + (x1 - x0) * t;
      y = y0 + (y1 - y0) * t;
    } else {
      const [cx, cy, r] = circles[k - segments.length];
      const a = rand() * Math.PI * 2;
      x = cx + Math.cos(a) * r;
      y = cy + Math.sin(a) * r;
    }
    pos[i * 3] = x + (rand() - 0.5) * 0.03;
    pos[i * 3 + 1] = y + (rand() - 0.5) * 0.03;
    pos[i * 3 + 2] = (rand() - 0.5) * 0.12;
  }
  return pos;
}

/** Amostra pontos de um glifo desenhado em canvas. */
function glyph(n: number, rand: Rand, char: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return sphere(n, rand);
  ctx.fillStyle = "#fff";
  ctx.font = `700 ${size * 0.9}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, size / 2, size / 2 + size * 0.04);
  const data = ctx.getImageData(0, 0, size, size).data;
  const filled: number[] = [];
  for (let y = 0; y < size; y += 2) {
    for (let x = 0; x < size; x += 2) {
      if (data[(y * size + x) * 4 + 3] > 128) filled.push(x, y);
    }
  }
  if (filled.length === 0) return sphere(n, rand);
  const pos = new Float32Array(n * 3);
  const scale = 3.6 / size;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(rand() * (filled.length / 2)) * 2;
    pos[i * 3] = (filled[k] - size / 2 + rand() * 2) * scale;
    pos[i * 3 + 1] = -(filled[k + 1] - size / 2 + rand() * 2) * scale;
    pos[i * 3 + 2] = (rand() - 0.5) * 0.35;
  }
  return pos;
}

export function buildShapes(n: number) {
  const rand = mulberry32(7);
  const logo = spinner(n, rand);
  const random = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    // direção aleatória com magnitude variada, usada para "explodir" entre formas
    const u = rand() * 2 - 1;
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(1 - u * u);
    const m = 0.4 + rand() * 1.2;
    random[i * 3] = r * Math.cos(a) * m;
    random[i * 3 + 1] = r * Math.sin(a) * m;
    random[i * 3 + 2] = u * m;
  }
  return {
    // A ordem segue src/lib/chapters.ts
    targets: [
      logo.pos,
      sphere(n, rand),
      lattice(n, rand),
      browser(n, rand),
      glyph(n, rand, "?"),
      logo.pos,
    ],
    bar: logo.bar,
    random,
  };
}
