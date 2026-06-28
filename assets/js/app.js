import { CHAT_FLOW } from './flow.js';

// Configurações do Negócio
const WHATSAPP_NUMBER = "5511999999999"; // Substitua pelo número real do Aura Ink

// Estado da Aplicação (Memória do Chat)
const state = {
  currentNode: 'welcome',
  answers: {
    style: '',
    size: '',
    location: ''
  }
};

// Seletores do DOM
const chatMessages = document.getElementById('chat-messages');
const chatActions = document.getElementById('chat-actions');

/**
 * Inicializa o fluxo do chat
 */
function initChat() {
  renderStep(state.currentNode);
}

/**
 * Renderiza a etapa atual do fluxo
 * @param {string} nodeKey 
 */
function renderStep(nodeKey) {
  const node = CHAT_FLOW[nodeKey];
  if (!node) return;

  state.currentNode = nodeKey;

  // 1. Renderiza a pergunta do Bot
  appendMessage(node.question, 'bot');

  // 2. Limpa as ações anteriores e prepara as novas
  chatActions.innerHTML = '';

  // Se for o nó de sumário, renderiza o botão final do WhatsApp
  if (nodeKey === 'summary') {
    renderWhatsAppButton();
    return;
  }

  // Caso contrário, renderiza os botões de opção
  node.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option.text;
    button.className = 'btn-option';
    button.addEventListener('click', () => handleUserChoice(option, node.field));
    chatActions.appendChild(button);
  });
}

/**
 * Adiciona uma bolha de mensagem no histórico do chat
 */
function appendMessage(text, sender) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  
  const innerText = document.createElement('p');
  innerText.textContent = text;
  
  messageElement.appendChild(innerText);
  chatMessages.appendChild(messageElement);

  // Scroll automático para a última mensagem
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Trata o clique do usuário em uma opção
 */
function handleUserChoice(option, field) {
  // Salva a resposta no estado
  if (field) {
    state.answers[field] = option.value;
  }

  // Desabilita os botões atuais para evitar duplo clique
  chatActions.innerHTML = '';

  // Mostra a escolha do usuário como uma mensagem no chat
  appendMessage(option.text, 'user');

  // Simula o "Digitando..." do bot com um leve delay de UX (500ms)
  setTimeout(() => {
    renderStep(option.next);
  }, 6000); // 600ms para uma transição natural
}

/**
 * Cria e renderiza o botão de conversão do WhatsApp
 */
function renderWhatsAppButton() {
  const wsLink = document.createElement('a');
  wsLink.className = 'btn-whatsapp';
  wsLink.textContent = 'Enviar Orçamento para o WhatsApp 🚀';
  wsLink.target = '_blank';
  wsLink.rel = 'noopener noreferrer';

  // Monta a string de mensagem formatada
  const messageText = `Olá, Aura Ink! Fiz a simulação de orçamento no site:\n\n` +
                      `• Estilo: ${state.answers.style}\n` +
                      `• Tamanho: ${state.answers.size}\n` +
                      `• Região: ${state.answers.location}`;

  wsLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;

  chatActions.appendChild(wsLink);
}

// Inicia o app assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initChat);
