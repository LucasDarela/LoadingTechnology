import type Lenis from "lenis";

// Estado mutável lido a cada frame pela cena 3D e pelo HUD.
// Fica fora do React de propósito: atualizar 60x por segundo via state re-renderizaria a página.
export const experience = {
  lenis: null as Lenis | null,
  /** 0 → 1 ao longo da página inteira */
  progress: 0,
  /** índice contínuo do capítulo (ex.: 1.4 = entre Stack e Chopp Hub) */
  morph: 0,
  velocity: 0,
  pointer: { x: 0, y: 0 },
  reducedMotion: false,
  /** true depois do primeiro frame renderizado (ou se o WebGL falhar) */
  sceneReady: false,
};

// Estado discreto que a UI precisa renderizar (capítulo ativo, preloader).
type UiState = { chapter: number; ready: boolean };
let ui: UiState = { chapter: 0, ready: false };
const listeners = new Set<() => void>();

export const uiStore = {
  get: () => ui,
  getServer: () => ui,
  set(patch: Partial<UiState>) {
    const next = { ...ui, ...patch };
    if (next.chapter === ui.chapter && next.ready === ui.ready) return;
    ui = next;
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function scrollToChapter(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (experience.lenis) experience.lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: experience.reducedMotion ? "auto" : "smooth" });
}
