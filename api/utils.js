const fs = require("fs");

const salvarArquivo = (dados, path) => {
  // Converte os dados para formato JSON
  const dadosJson = JSON.stringify(dados, null, 2);
  // Escreve os dados no arquivo
  return new Promise((resolve, reject) => {
    fs.writeFile(path, dadosJson, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = salvarArquivo;
