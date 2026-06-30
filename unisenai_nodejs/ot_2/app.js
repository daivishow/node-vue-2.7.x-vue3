var fs = require('fs');

/* 

Criar arquivo .txt com texto usando Node.js

fs.appendFile('novo.txt', 'Olá NodeJS! UniSENAI 2026', function (err){
    if (err) throw err;

    console.log('Arquivo Salvo!');
}) 
*/

/* 

Renomear texto do .txt usando Node.js

fs.writeFile('novo.txt', 'Olá NodeJS! UniSENAI 2026', function (err){
    if (err) throw err;

    console.log('Arquivo Salvo!');
})
*/

/* Renomear o nome do arquivo.txt usando Node.js

fs.rename('novo.txt', 'ArquivoNovoRenomeado.txt', function(err){
    if (err) throw err;

    console.log('Arquivo Salvo!');
})
*/

const moment = require("moment");
const time = new Date();
const parsedTime = moment(time).format("h:mm:ss");
console.log(parsedTime);

