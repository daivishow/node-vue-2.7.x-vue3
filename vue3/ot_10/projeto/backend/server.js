// Projeto Final — API do Painel Administrativo E-commerce
// Node.js + Express + Sequelize + MySQL + JWT
// Rodar: npm install && node server.js  (MySQL do XAMPP ligado, banco "ecommerce")

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');
const auth = require('./middlewares/auth');
const SEGREDO = auth.SEGREDO;

const app = express();
app.use(cors());
app.use(express.json());

// cria tabelas e um usuário/admin + produtos de exemplo na primeira execução
async function inicializar() {
  await sequelize.sync();
  const total = await Usuario.count();
  if (total === 0) {
    const hash = await bcrypt.hash('123456', 8);
    await Usuario.create({ nome: 'Admin', email: 'admin@admin.com', senha: hash });
    await Produto.bulkCreate([
      { nome: 'Camiseta', preco: 59.9, categoria: 'Vestuário', imagem: 'https://picsum.photos/seed/1/80', descricao: 'Camiseta 100% algodão' },
      { nome: 'Caneca', preco: 29.9, categoria: 'Casa', imagem: 'https://picsum.photos/seed/2/80', descricao: 'Caneca de cerâmica 300ml' }
    ]);
    console.log('Seed criado: admin@admin.com / 123456');
  }
}
inicializar();

app.get('/', (req, res) => res.send('API do Projeto Final rodando!'));

// ---- Auth ----
app.post('/registro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ erro: 'Campos obrigatórios.' });
    const hash = await bcrypt.hash(senha, 8);
    const u = await Usuario.create({ nome, email, senha: hash });
    res.status(201).json({ id: u.id, nome: u.nome, email: u.email });
  } catch (e) { res.status(400).json({ erro: e.message }); }
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const u = await Usuario.findOne({ where: { email } });
  if (!u || !(await bcrypt.compare(senha, u.senha)))
    return res.status(401).json({ erro: 'Credenciais inválidas.' });
  const token = jwt.sign({ id: u.id }, SEGREDO, { expiresIn: '2h' });
  res.json({ token, usuario: { id: u.id, nome: u.nome, email: u.email } });
});

// ---- Produtos (CRUD protegido por JWT) ----
app.get('/produtos', auth, async (req, res) => {
  const produtos = await Produto.findAll({ order: [['id', 'DESC']] });
  res.json(produtos);
});

app.post('/produtos', auth, async (req, res) => {
  const p = await Produto.create(req.body);
  res.status(201).json(p);
});

app.put('/produtos/:id', auth, async (req, res) => {
  const [linhas] = await Produto.update(req.body, { where: { id: req.params.id } });
  if (!linhas) return res.status(404).json({ erro: 'Produto não encontrado.' });
  res.json({ mensagem: 'Produto atualizado!' });
});

app.delete('/produtos/:id', auth, async (req, res) => {
  const linhas = await Produto.destroy({ where: { id: req.params.id } });
  if (!linhas) return res.status(404).json({ erro: 'Produto não encontrado.' });
  res.json({ mensagem: 'Produto excluído!' });
});

const PORT = 3001; // 3000 ocupada nesta máquina
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
