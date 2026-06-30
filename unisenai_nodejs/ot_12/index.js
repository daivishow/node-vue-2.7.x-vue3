import express from 'express';
import { buscarUfs, buscarUfPorId, buscarUfsPorNome } from './servicos/servico.js';

const app = express();

// Rota 1: retorna toda a coleção OU filtra por nome via query string
// Exemplo: GET /ufs          → retorna todos
// Exemplo: GET /ufs?busca=rio → retorna estados com "rio" no nome
app.get('/ufs', (req, res) => {
  const nomeUf = req.query.busca;
  const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : buscarUfs();

  if (resultado.length > 0) {
    res.json(resultado);
  } else {
    res.status(404).send({ "erro": "Nenhuma UF encontrada" });
  }
});

// Rota 2: retorna uma UF específica pelo ID, com tratamento de erros
app.get('/ufs/:iduf', (req, res) => {
  const uf = buscarUfPorId(req.params.iduf);

  if (uf) {
    res.json(uf);
  } else if (isNaN(parseInt(req.params.iduf))) {
    res.status(400).send({ "erro": "Requisição inválida" });
  } else {
    res.status(404).send({ "erro": "UF não encontrada" });
  }
});

app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080');
});
