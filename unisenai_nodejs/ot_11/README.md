# OT 11 — Tratamento de Erros na API (Parte II)

## 📖 Do que se trata?

Continuação da OT 10. Aqui você aprende a **tratar erros** na sua API para que ela responda de forma adequada quando alguém passar um ID inválido ou inexistente.

Sem tratamento de erros, a API retorna `undefined` silenciosamente — o que é ruim. Com tratamento, ela avisa exatamente o que deu errado com o **código HTTP correto**.

---

## 🧠 O que mudou em relação à OT 10?

Na OT 10, se você acessasse `/ufs/99` (ID que não existe), a API retornava `null` sem erro.
Agora ela retorna:
```json
{ "erro": "UF não encontrada" }
```
Com status HTTP **404**.

E se você acessar `/ufs/xyz` (letras no lugar de número):
```json
{ "erro": "Requisição inválida" }
```
Também com status **404**.

---

## 🗂️ Estrutura do projeto

```
ot_11/
├── dados/
│   └── dados.js       ← mesma coleção de UFs da OT 10
├── index.js           ← servidor com tratamento de erros
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
| `GET /ufs` | Todos os estados (200 OK) |
| `GET /ufs/19` | Estado com id=19 (200 OK) |
| `GET /ufs/99` | `{ "erro": "UF não encontrada" }` (404) |
| `GET /ufs/xyz` | `{ "erro": "Requisição inválida" }` (404) |

---

## 📝 Passo a passo para resolver

1. **Parta do projeto da OT 10** (mesma estrutura de pastas)
2. **Modifique a rota `/ufs/:iduf`** para incluir as verificações de erro:

### Lógica do tratamento:

```js
const idUF = parseInt(req.params.iduf);

// isNaN = "is Not a Number" = verifica se NÃO é número
if (!isNaN(idUF)) {
  // É um número: tenta encontrar no array
  uf = colecaoUf.find(u => u.id === idUF);
  if (!uf) {
    mensagemErro = 'UF não encontrada'; // número válido, mas não existe
  }
} else {
  mensagemErro = 'Requisição inválida'; // não é número (ex: "xyz")
}

// Responde com erro 404 se não encontrou
if (uf) {
  res.json(uf);
} else {
  res.status(404).send({ "erro": mensagemErro });
}
```

---

## 💡 Conceitos-chave

- **`isNaN(valor)`**: retorna `true` se o valor NÃO é um número
- **`!isNaN(valor)`**: retorna `true` se o valor É um número
- **`parseInt("xyz")`**: retorna `NaN` (Not a Number)
- **`parseInt("19")`**: retorna `19`
- **`res.status(404).send({...})`**: envia resposta com código de erro HTTP
