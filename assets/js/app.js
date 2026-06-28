import { CHAT_FLOW } from './flow.js';

// Configurações do Negócio
const WHATSAPP_NUMBER = "5519996615402"; // Substitua pelo número real do Aura Ink

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
  // Salva a resposta no estado se houver um campo mapeado
  if (field) {
    state.answers[field] = option.value;
  }

  // Desabilita as ações atuais imediatamente para evitar múltiplos cliques
  chatActions.innerHTML = '';

  // Mostra a escolha do usuário como uma mensagem no chat
  appendMessage(option.text, 'user');

  // Mostra o indicador de digitação do bot
  showTypingIndicator();

  // Simula o tempo de resposta humana do bot
  setTimeout(() => {
    removeTypingIndicator();
    renderStep(option.next);
  }, 1500); // Delay de 1.5 segundos para excelente percepção de UX
}

/**
 * Injeta a bolha de "Digitando..." de forma dinâmica no chat
 */
function showTypingIndicator() {
  const typingElement = document.createElement('div');
  typingElement.className = 'message bot typing-indicator-bubble';
  typingElement.id = 'typing-indicator';

  typingElement.innerHTML = `
    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  chatMessages.appendChild(typingElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Remove com precisão a bolha de "Digitando..." do DOM
 */
function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

/**
 * Cria e renderiza o botão de conversão final do WhatsApp
 */
function renderWhatsAppButton() {
  const wsLink = document.createElement('a');
  wsLink.className = 'btn-whatsapp';
  wsLink.textContent = 'Enviar Orçamento para o WhatsApp 🚀';
  wsLink.target = '_blank';
  wsLink.rel = 'noopener noreferrer';

  // Monta o template string da mensagem de forma limpa e legível
  const messageText = `Olá, Aura Ink! Fiz a simulação de orçamento no site:\n\n` +
                      `• Estilo: ${state.answers.style}\n` +
                      `• Tamanho: ${state.answers.size}\n` +
                      `• Região: ${state.answers.location}`;

  // Codifica a string para URL de forma segura
  wsLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;

  chatActions.appendChild(wsLink);
}

// Inicia o app assim que o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', initChat);
