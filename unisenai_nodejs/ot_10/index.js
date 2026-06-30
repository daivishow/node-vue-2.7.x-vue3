import express from 'express';
import colecaoUf from './dados/dados.js';

const app = express();

// Rota 1: retorna TODA a coleção de UFs
app.get('/ufs', (req, res) => {
  res.json(colecaoUf);
});

// Rota 2: retorna uma UF específica pelo ID
app.get('/ufs/:iduf', (req, res) => {
  const idUF = parseInt(req.params.iduf);
  const uf = colecaoUf.find(u => u.id === idUF);

  res.json(uf);
});

app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080');
});
