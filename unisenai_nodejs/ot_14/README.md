# OT 14 — Refatoração do TodoList

## 📖 Do que se trata?

Esta OT consolida o projeto **TodoList** com Node.js, Express e EJS.
Você tem uma aplicação web completa onde é possível:
- ✅ **Adicionar** tarefas
- 🗑️ **Deletar** tarefas

Os dados ficam em um **array na memória** do servidor (não usa banco de dados).

---

## 🧠 O que é EJS?

**EJS** (Embedded JavaScript) é uma *template engine* — permite misturar HTML com código JavaScript do servidor.

Por exemplo:
```html
<% for(let i = 0; i < tasksList.length; i++){ %>
  <p><%= tasksList[i] %></p>
<% } %>
```

- `<% %>` → executa código JS (sem exibir)
- `<%= %>` → executa e **exibe** o resultado na página

---

## 🗂️ Estrutura do projeto

```
ot_14/
├── views/
│   └── index.html      ← página HTML com EJS
├── public/
│   └── style.css       ← estilos CSS
├── index.js            ← servidor com todas as rotas
└── package.json
```

---

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar
npm run dev

# 3. Acessar no navegador
# http://localhost:5000
```

---

## 🔗 Rotas

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/` | Exibe a lista de tarefas |
| POST | `/` | Adiciona uma nova tarefa |
| GET | `/deletar/:id` | Remove a tarefa pelo índice |

---

## 📝 Passo a passo para resolver

### 1. Instale as dependências:
```bash
npm init -y
npm install express ejs body-parser nodemon
```

### 2. Configure o `index.js`:
```js
// Template engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Pastas
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

// Leitura de formulários
app.use(bodyParser.urlencoded({ extended: true }));
```

### 3. Crie as rotas:
- **GET `/`**: `res.render('index', { tasksList: tasks })`
- **POST `/`**: `tasks.push(req.body.task)` → depois renderiza
- **GET `/deletar/:id`**: usa `.filter()` para remover pelo índice

### 4. Crie a view `views/index.html` com o loop EJS para listar as tarefas

---

## 💡 Como o DELETE funciona

Cada tarefa na lista tem um link `/deletar/0`, `/deletar/1`, etc. (o índice do array).

Quando clicado, o servidor usa `.filter()` para manter apenas as tarefas cujo índice é diferente do id clicado:

```js
tasks = tasks.filter(function(val, index) {
  if (index != req.params.id) {
    return val; // mantém
  }
  // não retorna nada = remove
});
```

---

## ⚠️ Atenção

Os dados ficam apenas na memória. Se reiniciar o servidor, a lista volta ao estado inicial.
