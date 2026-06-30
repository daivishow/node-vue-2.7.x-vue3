const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const app = express();

// Configuração do EJS como template engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Pasta de arquivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

// Middleware para ler dados do formulário
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lista de tarefas em memória
let tasks = ['Ir ao mercado', 'Comprar pão', 'Passear com o dog'];

// Rota principal: exibe a lista
app.get('/', (req, res) => {
  res.render('index', { tasksList: tasks });
});

// Rota para ADICIONAR uma tarefa
app.post('/', (req, res) => {
  tasks.push(req.body.task);
  res.render('index', { tasksList: tasks });
});

// ✅ CORREÇÃO DO BUG: rota de deletar com res.redirect('/')
// PROBLEMA ANTES: ao deletar, a URL ficava em /deletar/0 e ficava
// re-executando o delete infinitamente ao recarregar a página.
// SOLUÇÃO: após deletar, redirecionar para '/' (rota principal).
app.get('/deletar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < tasks.length) {
    tasks.splice(id, 1); // Remove 1 elemento na posição 'id'
  }
  res.redirect('/'); // ← ESSA LINHA RESOLVE O BUG!
});

app.listen(3080, () => {
  console.log('Servidor rodando em http://localhost:3080');
});
