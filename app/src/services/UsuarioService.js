class UsuarioService {
  async registro(dados) {
    return await fetch("http://localhost:3000/registration", {
      method: "POST",
      headers: {
        // Aqui teriamos a autenticação
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Erro criar o cadastro:", error);
        throw error;
      });
  }
}

export default new UsuarioService();
