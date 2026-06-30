# OT 16 — Refatorando Bugs — Atividade Final

## 📖 Do que se trata?

Esta é a **OT final** do módulo de Node.js. O foco é corrigir um bug real no projeto TodoList e consolidar tudo que foi aprendido.

---

## 🐛 O Bug do Deletar

### Qual era o problema?

Quando você clicava no ícone de lixeira para deletar uma tarefa, a URL do navegador ficava em:
```
localhost:5000/deletar/0
```

E ficava **recarregando e deletando infinitamente** até o array ficar vazio — gerando erro na tela.

### Por que acontecia?

Porque a rota `/deletar/:id` usava `res.render()` para responder. Isso significa que a página era exibida, mas a **URL continuava em `/deletar/0`**. A cada reload manual, o delete era executado de novo.

### Como corrigir?

Trocar `res.render()` por **`res.redirect('/')`** — isso faz o navegador ir automaticamente para a rota principal após o delete.

```js
// ❌ ANTES (com bug):
app.get('/deletar/:id', (req, res) => {
  tasks = tasks.filter(function(val, index) {
    if (index != req.params.id) {
      return val;
    }
  });
  res.render('index', { tasksList: tasks }); // ← mantém na URL /deletar/0
});

// ✅ DEPOIS (corrigido):
app.get('/deletar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < tasks.length) {
    tasks.splice(id, 1); // remove 1 elemento na posição id
  }
  res.redirect('/'); // ← volta para a rota principal. BUG RESOLVIDO!
});
```

---

## 🗂️ Estrutura do projeto

```
ot_16/
├── views/
│   └── index.html      ← HTML com SweetAlert2
├── public/
│   └── style.css
├── index.js            ← servidor com o bug corrigido
└── package.json
```

---

## 🚀 Como rodar

```bash
npm install
npm run dev
# Acessar: http://localhost:3080
```

---

## 📝 Resumo das correções desta OT

| O que era | O que ficou |
|-----------|-------------|
| `res.render()` no delete | `res.redirect('/')` |
| `alert()` padrão | `Swal.fire()` do SweetAlert2 |

---

## 💡 Conceito: `res.redirect()` vs `res.render()`

- **`res.render('pagina')`**: renderiza o HTML e **mantém a URL atual**
- **`res.redirect('/')`**: **manda o navegador fazer uma nova requisição GET** para `/`, trocando a URL

Para operações de delete/create/update, o padrão correto é **sempre redirecionar** após a ação — isso evita o problema de "reenviar formulário ao recarregar a página".

---

##

Com esta OT você completou o módulo de Node.js do UniSENAI! Você aprendeu:
- Criar servidores com Express
- Trabalhar com rotas GET e POST
- Usar EJS como template engine
- Criar APIs REST
- Tratar erros HTTP
- Separar código em camadas (serviço, dados, rotas)
- Corrigir bugs reais de aplicações web
