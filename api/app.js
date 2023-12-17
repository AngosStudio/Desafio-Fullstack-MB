const express = require("express");
const app = express();
const port = 3000;
const UsuarioModel = require("./models/UsuarioModel");
const salvarArquivo = require("./utils");
const cors = require("cors");

const db = require("./db.json");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Desafio MB Web");
});

app.post("/registration", (req, res) => {
  // valida os campos
  const novoUsuario = req.body;
  if (!novoUsuario) {
    res.status(400).json({
      error: `Existem campos de preenchimento obrigatório que não foram preenchidos.`,
    });
    return;
  }

  // valida a model
  let erro = false;
  const fields = Object.keys(UsuarioModel);
  fields.forEach((field) => {
    if (
      UsuarioModel[field].required &&
      (!novoUsuario[field] || novoUsuario[field].trim() === "")
    ) {
      res.status(400).json({
        error: `O campo ${field} tem seu preenchimento obrigatório.`,
      });
      erro = true;
    } else if (UsuarioModel[field].unique) {
      const search = db.find((row) => {
        return row[field] === novoUsuario[field];
      });

      if (search) {
        res.status(422).json({
          error: `O campo ${field} deve ser único.`,
        });
        erro = true;
      }
    }
  });

  if (erro) return;

  try {
    db.push(novoUsuario);
    salvarArquivo(db, "./db.json");

    res.json(novoUsuario);
    return;
  } catch (error) {
    console.error("[POST] /registration", error);
    res.status(500).json({
      error: error,
    });
    return;
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
