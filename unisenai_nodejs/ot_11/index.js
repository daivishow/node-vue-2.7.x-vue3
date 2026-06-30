import express from 'express';
import colecaoUf from './dados/dados.js';

const app = express();

// Rota 1: retorna TODA a coleção de UFs
app.get('/ufs', (req, res) => {
  res.json(colecaoUf);
});

// Rota 2: retorna uma UF específica pelo ID, com tratamento de erros
app.get('/ufs/:iduf', (req, res) => {
  const idUF = parseInt(req.params.iduf);
  let mensagemErro = '';
  let uf;

  // Verifica se o parâmetro é um número válido
  if (!isNaN(idUF)) {
    uf = colecaoUf.find(u => u.id === idUF);
    if (!uf) {
      mensagemErro = 'UF não encontrada';
    }
  } else {
    // Parâmetro não é número (ex: /ufs/xyz)
    mensagemErro = 'Requisição inválida';
  }

  if (uf) {
    res.json(uf);
  } else {
    res.status(404).send({ "erro": mensagemErro });
  }
});

app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080');
});
