// flow.js
export const CHAT_FLOW = {
  welcome: {
    question: "Olá! Boas-vindas ao Aura Ink Studio. 🖋️ Para começarmos o seu pré-orçamento, qual estilo de tatuagem você deseja?",
    field: "style",
    options: [
      { text: "Fineline ✒️", value: "Fineline", next: "size" },
      { text: "Blackwork 🖤", value: "Blackwork", next: "size" },
      { text: "Realismo 🦁", value: "Realismo", next: "size" }
    ]
  },
  size: {
    question: "Massa! E qual seria o tamanho aproximado da sua tattoo?",
    field: "size",
    options: [
      { text: "Pequena (até 5cm)", value: "Pequena (até 5cm)", next: "location" },
      { text: "Média (até 15cm)", value: "Média (até 15cm)", next: "location" },
      { text: "Grande (fechamento)", value: "Grande (fechamento)", next: "location" }
    ]
  },
  location: {
    question: "Para finalizar: em qual região do corpo você pretende fazer?",
    field: "location",
    options: [
      { text: "Braço / Perna", value: "Braço ou Perna", next: "summary" },
      { text: "Costelas / Costas", value: "Costelas ou Costas", next: "summary" },
      { text: "Outro local", value: "Outro local", next: "summary" }
    ]
  },
  summary: {
    question: "Perfeito! Tudo pronto para o seu atendimento exclusivo. Clique abaixo para enviar suas preferências ao nosso tatuador via WhatsApp! 👇",
    field: null,
    options: [] // Nó final não tem botões de opção, apenas o gatilho do Whats
  }
};
