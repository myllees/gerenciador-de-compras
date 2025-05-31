// Função para formatar número como moeda BRL (R$)
function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

// Função para validar se todos os campos estão preenchidos
function validarCampos() {
  for (let i = 0; i < arguments.length; i++) {
    const campo = arguments[i];
    if (!campo || campo.toString().trim() === '') return false;
  }
  return true;
}

// Função para gerar ID único baseado em timestamp
function gerarIdUnico() {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Função para exibir alertas padronizados
function alerta(msg) {
  alert(msg); // Pode ser substituído por uma lib mais elegante futuramente
}

// Função para resetar formulário
function resetarFormulario(form) {
  form.reset();
  form.querySelector('button[type="submit"]').textContent = 'Adicionar';
}

// Função para salvar compras no localStorage
function salvarCompras(compras) {
  localStorage.setItem('compras', JSON.stringify(compras));
}

// Função para carregar compras do localStorage
function carregarCompras() {
  const data = localStorage.getItem('compras');
  return data ? JSON.parse(data) : [];
}