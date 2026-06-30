const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let carros = [
    { nome: "Onix", preco: 75000, marca: "Chevrolet" },
    { nome: "HB20", preco: 78000, marca: "Hyundai" },
    { nome: "Gol", preco: 65000, marca: "Volkswagen" },
    { nome: "Basalt", preco: 72000, marca: "Citroen" },
    { nome: "Corolla", preco: 145000, marca: "Toyota" },
    { nome: "Civic", preco: 160000, marca: "Honda" }
];

app.get("/", (req, res) => {
    res.send('<h1 style="color: blue">CRUD DE CARROS COM EXPRESS.JS</h1>');
});

app.get("/cars", (req, res) => {
    return res.json(carros);
});

app.get("/cars/:id", (req, res) => {
    let id = req.params.id;
    return res.json(carros[id]);
});

app.post("/cars", (req, res) => {
    let { nome, preco, marca } = req.body;
    carros.push({ nome, preco, marca });
    return res.json(carros);
});

app.put("/cars/:id", (req, res) => {
    let id = req.params.id;
    let { nome, preco, marca } = req.body;
    carros[id] = { nome, preco, marca };
    return res.json(carros[id]);
});

app.delete("/cars/delete/:id", (req, res) => {
    let id = req.params.id;
    carros[id] = null;
    return res.json(carros[id]);
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});
