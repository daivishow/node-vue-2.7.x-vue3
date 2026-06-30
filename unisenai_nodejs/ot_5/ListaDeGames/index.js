//carregando o express
const express = require("express");
//instancio o express e carregando a biblioteca do express dentro dessa const app
const app = express();

app.listen(3080,() => {
    console.log("Servidor rodando!");
})

app.get("/", (req, res) => {
    res.json (games);
})

let games = [
    {title: "Halo 5", studio: "Microsoft", price: 90},
    {title: "Gears of War 4", studio: "Microsoft", price: 90},
    {title: "COD", studio: "Activision", price: 60},
    {title: "God of War", studio: "Sony", price: 120},
    {title: "Death Stranding", studio: "Sony", price: 120},
    {title: "Pragmata", studio: "CAPCOM", price: 120},
    {title: "Resident Evil", studio: "CAPCOM", price: 90},
    {title: "Street Fighter", studio: "CAPCOM", price: 90},
    {title: "Mortal Kombat", studio: "NetherRealm Studios", price: 90},
    {title: "Counter-Strike", studio: "Valve", price: 10}
]