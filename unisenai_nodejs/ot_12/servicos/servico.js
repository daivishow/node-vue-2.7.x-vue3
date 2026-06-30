import colecaoUf from '../dados/dados.js';

// Retorna toda a coleção de UFs
export const buscarUfs = () => {
  return colecaoUf;
};

// Busca UFs pelo nome (parcial, case-insensitive)
export const buscarUfsPorNome = (nomeUf) => {
  return colecaoUf.filter(
    uf => uf.nome.toLowerCase().includes(nomeUf.toLowerCase())
  );
};

// Busca uma UF específica pelo ID
export const buscarUfPorId = (id) => {
  const idUF = parseInt(id);
  return colecaoUf.find(uf => uf.id === idUF);
};
