const express = require("express");
const app = express();
app.use(express.json());

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
];

app.get("/", (req, res) => {
    res.json(games);
});

app.post("/novogame", (req, res) => {
    let { title, studio, price } = req.body;

    games.push({ title, studio, price });

    res.send("OK");
});

app.put("/novogame/:index", (req, res) => {
    const { index } = req.params;
    let title = req.body.title;
    let studio = req.body.studio;
    let price = req.body.price;

    games[index] = { title, studio, price };

    return res.json(games);
});

app.delete("/:index", (req, res) => {
    const { index } = req.params;

    games.splice(index, 1);

    res.send("O game foi deletado com sucesso!");
});

app.listen(3080, () => {
    console.log("Servidor iniciado na porta 3080");
});
