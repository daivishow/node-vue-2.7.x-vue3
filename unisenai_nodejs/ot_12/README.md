# OT 12 — Busca na API + Refatoração em Camadas (Parte III)

## 📖 Do que se trata?

Duas evoluções importantes acontecem nesta OT:

1. **Busca por nome**: a API agora permite filtrar UFs pelo nome usando uma *query string* (`?busca=rio`)
2. **Separação em camadas**: o código é reorganizado para ficar mais limpo e profissional

---

## 🏗️ Arquitetura em Camadas

Antes, toda a lógica ficava no `index.js`. Agora separamos:

```
index.js   →   servico.js   →   dados.js
(rotas)       (lógica)         (dados)
```

- **`index.js`**: só define as rotas e chama as funções do serviço
- **`servico.js`**: contém toda a lógica (buscar, filtrar, encontrar)
- **`dados.js`**: só armazena a coleção de UFs

Isso se chama **separação de responsabilidades** — cada arquivo faz uma coisa só.

---

## 🗂️ Estrutura do projeto

```
ot_12/
├── dados/
│   └── dados.js           ← coleção de UFs
├── servicos/
│   └── servico.js         ← lógica da aplicação
├── index.js               ← apenas as rotas
└── package.json
```

---

## 🚀 Como rodar

```bash
npm install
npm run dev
```

---

## 🔗 Rotas disponíveis

| Rota | O que retorna |
|------|---------------|
| `GET /ufs` | Todos os 27 estados |
| `GET /ufs?busca=rio` | Estados com "rio" no nome |
| `GET /ufs?busca=mato` | Mato Grosso e Mato Grosso do Sul |
| `GET /ufs/19` | Rio de Janeiro (id=19) |
| `GET /ufs/99` | `{ "erro": "UF não encontrada" }` |
| `GET /ufs/xyz` | `{ "erro": "Requisição inválida" }` |

---

## 📝 Passo a passo para resolver

### 1. Crie o arquivo `servicos/servico.js`:
```js
import colecaoUf from '../dados/dados.js';

export const buscarUfs = () => colecaoUf;

export const buscarUfsPorNome = (nomeUf) =>
  colecaoUf.filter(uf => uf.nome.toLowerCase().includes(nomeUf.toLowerCase()));

export const buscarUfPorId = (id) =>
  colecaoUf.find(uf => uf.id === parseInt(id));
```

### 2. Atualize o `index.js` para importar do serviço:
```js
import { buscarUfs, buscarUfPorId, buscarUfsPorNome } from './servicos/servico.js';
```

### 3. Use `req.query.busca` para capturar o parâmetro de busca:
```js
app.get('/ufs', (req, res) => {
  const nomeUf = req.query.busca;
  // Se veio um nome, filtra. Senão, retorna tudo.
  const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : buscarUfs();
  res.json(resultado);
});
```

---

## 💡 Conceitos-chave

- **`req.query.busca`**: captura `?busca=valor` da URL
- **`array.filter()`**: retorna todos os elementos que satisfazem uma condição
- **`string.includes()`**: verifica se uma string contém outra
- **`toLowerCase()`**: converte para minúsculas (para busca sem diferenciar maiúsculas)
- **`export const`**: exporta uma função para ser usada em outro arquivo
- **`import { } from`**: importa funções específicas de outro arquivo
