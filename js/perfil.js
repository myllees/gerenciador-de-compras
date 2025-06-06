document.addEventListener("DOMContentLoaded", () => {
  const userLogado = carregarUsuarioLogado();

  if (!userLogado) {
    alert("Você precisa estar logado.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("nome").value = userLogado.nome;
  document.getElementById("email").value = userLogado.email;
  document.getElementById("senha").value = userLogado.senha;

  document.getElementById("perfilForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const novoUsuario = { nome, email, senha };
    atualizarUsuarioLogado(novoUsuario);

    alert("Dados atualizados com sucesso!");
  });
});
