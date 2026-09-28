"use client";

import dynamic from "next/dynamic";
import { SmoothScroll } from "./SmoothScroll";
import { Preloader } from "./Preloader";
import { Hud } from "./Hud";

// three.js só existe no navegador; fica num chunk separado.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export function Experience() {
  return (
    <>
      {/* Fundo em CSS: aparece antes do WebGL e serve de fallback sem ele */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgb(26_47_168/0.22),transparent_65%)]"
      />
      <Scene />
      {/* Vinheta: escurece as bordas e dá profundidade ao túnel */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(5_5_7/0.85)_100%)]"
      />
      {/* Faixas escuras sob o HUD, para o conteúdo não colidir com ele ao rolar */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-30 h-28 bg-gradient-to-b from-background via-background/75 to-transparent" />
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-background via-background/75 to-transparent" />
      <SmoothScroll />
      <Hud />
      <Preloader />
    </>
  );
}
