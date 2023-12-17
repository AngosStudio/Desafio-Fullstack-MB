const UsuarioModel = {
  email: { type: String, required: true, unique: true },
  nome_razao: { type: String, required: true },
  documento: { type: String, required: true, unique: true },
  dn_da: { type: String, required: true },
  telefone: { type: String, required: true },
  senha: { type: String, required: true },
};

module.exports = UsuarioModel;
