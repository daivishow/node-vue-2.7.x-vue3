# Atividade — Perguntas e Respostas

**1. O que é Node.js e por que é popular no desenvolvimento web?**
O Node.js é um ambiente de execução de JavaScript do lado do servidor (server-side), construído sobre o motor V8 do Google Chrome. Ele permite criar aplicações standalone, sem depender de um navegador. É popular porque usa uma linguagem já dominada pela comunidade (JavaScript), tem alta performance graças ao modelo assíncrono e não bloqueante de I/O, possui um ecossistema gigantesco de pacotes via NPM e é leve e escalável, sendo adotado por empresas como Netflix, Uber, NASA e Slack.

**2. Qual é a diferença entre o Node.js e outras tecnologias de servidor, como o Apache?**
O Apache é um servidor web tradicional que normalmente trabalha com múltiplas threads/processos, criando uma thread para cada requisição. O Node.js usa uma única thread com event loop e I/O assíncrono e não bloqueante, atendendo milhares de conexões simultâneas com baixo consumo de recursos. Além disso, o Node.js não é apenas um servidor: é uma plataforma completa onde o próprio servidor é escrito em JavaScript dentro da aplicação.

**3. Como você inicia um projeto Node.js usando o npm?**
Cria-se a pasta do projeto e, dentro dela, roda-se o comando `npm init` (ou `npm init -y` para aceitar todas as opções padrão). Isso gera o arquivo `package.json`, que registra os metadados e as dependências do projeto. Depois disso, instalam-se as dependências necessárias com `npm install <pacote>`.

**4. O que é o Express.js e qual é o seu papel no desenvolvimento web com Node.js?**
O Express.js é um framework web minimalista e de código aberto para Node.js. Seu papel é facilitar a criação de servidores, APIs e aplicações web, oferecendo de forma simples o gerenciamento de rotas, middlewares, tratamento de requisições/respostas HTTP e integração com mecanismos de template, poupando tempo em relação ao uso do módulo `http` puro.

**5. Explique o conceito de middleware no contexto do Express.js.**
Middleware é uma função que fica "no meio" do ciclo requisição/resposta e tem acesso aos objetos `req`, `res` e à função `next()`. Cada middleware pode executar código, modificar a requisição/resposta, encerrar o ciclo ou passar o controle para o próximo middleware com `next()`. Exemplos: `express.json()` (interpreta o corpo JSON), autenticação, logs e tratamento de erros.

**6. Como você roteia solicitações HTTP em um aplicativo Express?**
Usando os métodos do objeto da aplicação correspondentes aos verbos HTTP: `app.get()`, `app.post()`, `app.put()`, `app.delete()` etc. Cada método recebe o caminho da rota e uma função callback `(req, res)`. Também é possível usar parâmetros dinâmicos na rota com `:` (ex.: `app.get('/games/:id')`) e organizar rotas com `express.Router()`.

**7. O que é o middleware de análise de corpo (body-parser) e por que é útil em um aplicativo Express?**
É o middleware responsável por interpretar (fazer o parsing) o corpo das requisições HTTP e disponibilizá-lo em `req.body`. Sem ele, dados enviados via POST/PUT (JSON ou formulários) chegariam como texto bruto. Nas versões atuais do Express ele já vem embutido através de `express.json()` e `express.urlencoded()`. É útil porque permite capturar facilmente as informações enviadas pelo cliente, como `req.body.title`.

**8. Quais são os principais métodos HTTP e como eles são usados em rotas Express?**
- **GET** — buscar/ler dados: `app.get('/games', ...)`
- **POST** — criar/enviar dados novos: `app.post('/novogame', ...)`
- **PUT** — atualizar dados existentes: `app.put('/novogame/:index', ...)`
- **DELETE** — excluir dados: `app.delete('/:index', ...)`

**9. Como você lida com erros em um aplicativo Express?**
Validando entradas e retornando códigos de status HTTP adequados (`res.status(404).send(...)`, `res.status(400).send(...)`), usando blocos `try/catch` em código assíncrono e criando middlewares de erro com quatro parâmetros `(err, req, res, next)`, que centralizam o tratamento e devolvem uma resposta apropriada ao cliente, evitando que a aplicação trave.

**10. O que é uma API RESTful e como o Express pode ser usado para criar uma?**
Uma API RESTful é uma API que segue os princípios do padrão REST: recursos identificados por URLs no nome do domínio/coleção (ex.: `/games`, `/games/1`), uso correto dos verbos HTTP (GET, POST, PUT, DELETE), comunicação sem estado (stateless) e respostas geralmente em JSON com códigos de status adequados. Com o Express, basta criar as rotas para cada recurso e verbo, usar `express.json()` para tratar o corpo das requisições e responder com `res.json()` e `res.status()`, formando o CRUD completo da coleção de dados.
