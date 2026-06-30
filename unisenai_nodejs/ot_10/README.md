# OT 10 — Coleção de Dados, Tratamento de Erros e Busca na API (Parte I)

## 📖 Do que se trata?

Nesta OT você aprende a criar uma **API REST** com Node.js e Express.
Uma API REST é basicamente um servidor que responde a requisições HTTP com dados (geralmente no formato JSON).

O projeto desta OT é uma API que retorna dados das **Unidades Federativas (UFs)** do Brasil.

---

## 🧠 Conceitos aprendidos

- **GET**: método HTTP para *buscar* informações
- **POST**: para *criar*
- **PUT**: para *editar*
- **DELETE**: para *deletar*

### Códigos HTTP mais comuns:
| Código | Significado |
|--------|-------------|
| 200 | Sucesso |
| 201 | Criado |
| 400 | Requisição inválida |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

---

## 🗂️ Estrutura do projeto

```
ot_10/
├── dados/
│   └── dados.js       ← coleção de UFs (array com todos os estados)
├── index.js           ← servidor Express com as rotas
└── package.json       ← configurações do projeto
```

---

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar o servidor
npm run dev
```

---

## 🔗 Rotas disponíveis

| Rota | O que faz |
|------|-----------|
| `GET /ufs` | Retorna todos os 27 estados |
| `GET /ufs/19` | Retorna apenas o estado com id=19 (Rio de Janeiro) |

---

## 📝 Passo a passo para resolver

1. **Crie a pasta do projeto** e abra no VSCode
2. **Rode `npm init -y`** para criar o package.json
3. **Instale o Express**: `npm install express`
4. **Instale o Nodemon**: `npm install nodemon`
5. **Crie a pasta `dados/`** e dentro dela o arquivo `dados.js` com o array de UFs (já fornecido aqui)
6. **Crie o `index.js`** com as duas rotas: `/ufs` e `/ufs/:iduf`
7. **Adicione `"type": "module"`** no package.json (para usar `import/export`)
8. **Adicione o script `"dev": "nodemon index.js"`** no package.json
9. **Rode `npm run dev`** e teste no navegador ou no Thunder Client

---

## 💡 Dica importante

O `:iduf` na rota é um **parâmetro dinâmico**. Quando alguém acessa `/ufs/5`, o valor `5` fica disponível em `req.params.iduf`.

```js
app.get('/ufs/:iduf', (req, res) => {
  const idUF = parseInt(req.params.iduf); // converte "5" para o número 5
  const uf = colecaoUf.find(u => u.id === idUF); // busca no array
  res.json(uf); // retorna o resultado
});
```
