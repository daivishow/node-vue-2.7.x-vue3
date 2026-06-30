# OT 15 — Consumindo API no FrontEnd (SweetAlert2)

## 📖 Do que se trata?

Nesta OT o foco é melhorar a **experiência do usuário** no front-end do TodoList.

A principal mudança é substituir o `alert()` padrão do navegador (feio e simples) pelo **SweetAlert2**, uma biblioteca que cria alertas modernos e bonitos.

---

## ✨ O que muda em relação à OT 14?

| OT 14 | OT 15 |
|-------|-------|
| `alert("Preencha a tarefa")` | `Swal.fire({ icon: 'error', title: 'Oops...', text: '...' })` |
| Alert feio nativo do browser | Alert bonito e estilizado |

O `index.js` do servidor **permanece igual** à OT 14. Só o front-end (HTML) muda.

---

## 🗂️ Estrutura do projeto

```
ot_15/
├── views/
│   └── index.html      ← HTML atualizado com SweetAlert2
├── public/
│   └── style.css
├── index.js            ← igual à OT 14
└── package.json
```

---

## 🚀 Como rodar

```bash
npm install
npm run dev
# Acessar: http://localhost:5000
```

---

## 📝 Como incluir o SweetAlert2

### No `<head>` (CSS):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/sweetalert2.min.css">
```

### Antes do `</body>` (JavaScript):
```html
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/sweetalert2.all.min.js"></script>
```

### Na função de validação (substitua o `alert`):
```js
// ANTES (OT 14):
alert("Por favor, preencha a tarefa antes de enviar.");

// DEPOIS (OT 15):
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Por favor, preencha a tarefa antes de enviar.',
});
```

---

## 💡 Dica

O link CSS do SweetAlert2 vai no `<head>`, **acima** dos outros estilos.
O script JS vai **abaixo da tag `</body>`**, junto com os outros scripts.

Documentação completa: https://sweetalert2.github.io/
