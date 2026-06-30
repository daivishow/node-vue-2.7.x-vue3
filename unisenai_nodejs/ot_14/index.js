const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const app = express();

// Configuração do EJS como template engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Pasta de arquivos estáticos (CSS, imagens...)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Pasta de views (páginas HTML)
app.set('views', path.join(__dirname, '/views'));

// Middleware para ler dados do formulário
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lista de tarefas em memória
let tasks = ['Passear com o dog', 'Ir ao mercado', 'Comprar pão'];

// Rota principal: exibe a lista
app.get('/', (req, res) => {
  res.render('index', { tasksList: tasks });
});

// Rota para ADICIONAR uma tarefa
app.post('/', (req, res) => {
  tasks.push(req.body.task);
  res.render('index', { tasksList: tasks });
});

// Rota para DELETAR uma tarefa pelo índice
app.get('/deletar/:id', (req, res) => {
  // filter mantém apenas os itens cujo índice é DIFERENTE do id clicado
  tasks = tasks.filter(function(val, index) {
    if (index != req.params.id) {
      return val;
    }
  });
  res.render('index', { tasksList: tasks });
});

app.listen(3080, () => {
  console.log('Servidor rodando em http://localhost:3080');
});
