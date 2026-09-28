// Cada capítulo é uma seção da página e uma forma da nuvem de partículas.
// `side` diz de que lado o objeto 3D fica para não disputar espaço com o texto.
export const chapters = [
  { id: "inicio", label: "Início", side: 0 },
  { id: "servicos", label: "Stack", side: 1 },
  { id: "cases", label: "Chopp Hub", side: -1 },
  { id: "darela", label: "Darela Chopp", side: 1 },
  { id: "faq", label: "Dúvidas", side: -1 },
  { id: "contato", label: "Contato", side: 0 },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
