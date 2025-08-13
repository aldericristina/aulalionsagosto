"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hello type script");
let nome = "cristina";
let ano = 2025;
console.log(nome);
console.log(ano);
let estoque = true;
console.log(estoque);
let numeros = [1, 2, 3];
console.log(numeros);
let preco = 1000;
console.log(preco);
let categoria = ["categoria", "tamanho", "cor"];
console.log(categoria);
let coordenadas = ["latitude", "longitude"];
console.log(coordenadas);
var statospedido;
(function (statospedido) {
    statospedido[statospedido["Pendente"] = 0] = "Pendente";
    statospedido[statospedido["Processando"] = 1] = "Processando";
    statospedido[statospedido["Entregue"] = 2] = "Entregue";
    statospedido[statospedido["Cancelado"] = 3] = "Cancelado";
})(statospedido || (statospedido = {}));
let pedido = statospedido.Cancelado;
console.log(pedido);
let produto = {
    preco: 100,
    estoque: true, nome: "notebook"
};
function exibirproduto(produto) {
    console.log("o nome do produto e " + produto.nome);
    console.log(" o preco do produto e" + produto.preco);
}
exibirproduto(produto);
const user1 = {
    id: 1,
    name: "Maria Cecilia",
    email: "aldericristina@gmail.com",
    isActive: true,
    age: 30,
};
const product = {
    id: 101,
    name: "Aquário de Vidro 50L",
    price: 299.90,
    inStock: true,
    categories: "aquario",
    age: 30,
};
const adminUser = {
    id: 2,
    name: "Joao da Silva",
    email: "aldericristina@gmail.com",
    isActive: true,
    role: "admin",
    age: 40
};
// Impressão no console
console.log("Usuário comum:", "user1");
console.log("Produto:", product);
console.log("Usuário administrador:", adminUser);
// 1️⃣ Função genérica que retorna o mesmo array
function getData(items) {
    return items;
}
// 2️⃣ Função genérica que retorna item pelo ID
function getById(items, id) {
    return items.find(item => item.id === id);
}
// Exemplos de uso
// Strings
const stringArray = getData(["Peixe", "Aquário", "Filtro"]);
console.log("Array de strings:", stringArray);
// Números
const numberArray = getData([10, 20, 30, 40]);
console.log("Array de números:", numberArray);
// Objetos IUser
let users = [
    { id: 1, name: "Maria Cecilia", email: "aldericristina@gmail.com", isActive: true, age: 30 },
    { id: 2, name: "Joao da Silva", email: "aldericristina@gmail.com", isActive: false, age: 40 },
];
const userArray = getData(users);
console.log("Array de usuários:", userArray);
// Objetos IProduct
const products = [
    { id: 101, name: "Aquário 50L", price: 299.90, inStock: true, categories: "aquario", age: 35 },
    { id: 102, name: "Filtro Externo", price: 159.50, inStock: false, categories: "filtro", age: 45 }
];
// Testando getById com usuários
const foundUser = getById(users, 1);
console.log("Usuário encontrado (ID 1):", foundUser);
// Testando getById com produtos
const foundProduct = getById(products, 102);
console.log("Produto encontrado (ID 102):", foundProduct);
// Array de usuários em memória
let users2 = [
    { id: 1, name: "Maria Cecilia", email: "joao@example.com", isActive: true, age: 45 },
    { id: 2, name: "Joao da Silva", email: "maria@example.com", isActive: false, age: 50 }
];
// Função simples de validação
function isValidUser(obj) {
    return (typeof obj.id === "number" &&
        typeof obj.name === "string" &&
        typeof obj.email === "string" &&
        typeof obj.isActive === "boolean");
}
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// GET /users → retorna todos
app.get("/users", (req, res) => {
    res.json(users);
});
// GET /users/:id → retorna usuário por ID
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
});
// POST /users → adiciona usuário
app.post("/users", (req, res) => {
    const newUser = req.body;
    if (!isValidUser(newUser)) {
        return res.status(400).json({ error: "Dados inválidos para IUser" });
    }
    if (users.some(u => u.id === newUser.id)) {
        return res.status(400).json({ error: "Já existe um usuário com este ID" });
    }
    users.push(newUser);
    res.status(201).json(newUser);
});
// PUT /users/:id → atualiza usuário
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    //   users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
});
// DELETE /users/:id → remove usuário
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    users = users.filter(u => u.id !== id);
    res.json({ message: "Usuário removido com sucesso" });
});
// Inicia o servidor
app.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
});
//# sourceMappingURL=app.js.map