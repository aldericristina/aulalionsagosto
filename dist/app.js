"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryManager = exports.Region = exports.CountryService = void 0;
exports.fetchCountries = fetchCountries;
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
const validation_br_1 = __importDefault(require("validation-br"));
const cep_promise_1 = __importDefault(require("cep-promise"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.get("/", (_req, res) => {
    res.send("🌍 API de Países rodando com TypeScript");
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
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
app.get("/valida-cpf/:cpf", (req, res) => {
    if (validation_br_1.default.isCPF(req.params.cpf)) {
        return res.send("cpf valido");
    }
    else {
        return res.send("cpf invalido");
    }
});
app.get("/valida-cnpj/:cnpj", (req, res) => {
    if (validation_br_1.default.isCNPJ(req.params.cpf)) {
        return res.send("cnpj valido");
    }
    else {
        return res.send("cnpj invalido");
    }
});
app.get("/valida-cnh/:cnh", (req, res) => {
    if (validation_br_1.default.isCNH(req.params.cnh)) {
        return res.send("cnh valido");
    }
    else {
        return res.send("cnh invalido");
    }
});
app.get('/valida-cep/:cep', async (req, res) => {
    const dados = await (0, cep_promise_1.default)(req.params.cep)
        .then((data) => { return data; })
        .catch((err) => { return err; });
    return res.json({ dados: dados });
});
//import cep from 'cep-promise';
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
class CountryService {
    constructor() {
        this.apiUrl = "https://restcountries.com/v3.1/all";
        this.countries = [];
    }
    // Carrega os dados da API e armazena em memória
    async loadCountries() {
        if (this.countries.length === 0) {
            const response = await axios_1.default.get(this.apiUrl);
            this.countries = response.data;
        }
    }
    getAll() {
        return this.countries;
    }
    // Pesquisa por nome
    searchByName(name) {
        return this.countries.filter((Country) => Country.name.common.toLowerCase().includes(name.toLowerCase()));
    }
    // Filtra por região
    filterByRegion(region) {
        return this.countries.filter((Country) => Country.region.toLowerCase() === region.toLowerCase());
    }
}
exports.CountryService = CountryService;
// 🔍 Buscar todos os países
app.get("/countries", async (_req, res) => {
    try {
        const response = await axios_1.default.get("https://restcountries.com/v3.1/all?fields=name,flags");
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar países" });
    }
});
app.get("/countries/:name", async (_req, res) => {
    try {
        const response = await axios_1.default.get("https://restcountries.com/v3.1/name/" + _req.params.name);
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar países" });
    }
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
var Region;
(function (Region) {
    Region["Africa"] = "Africa";
    Region["Americas"] = "Americas";
    Region["Asia"] = "Asia";
    Region["Europe"] = "Europe";
    Region["Oceania"] = "Oceania";
})(Region || (exports.Region = Region = {}));
const API_URL = "https://restcountries.com/v3.1/all";
async function fetchCountries() {
    try {
        const response = await axios_1.default.get(API_URL);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao buscar países:", error);
        return []; // retorna array vazio em caso de erro
    }
}
// index.ts exemplo 
async function main() {
    const countries = await fetchCountries();
    if (countries.length > 0) {
        console.log("Total de países:", countries.length);
        console.log("Primeiro país:", countries[0].name.common);
    }
    else {
        console.log("Nenhum país encontrado.");
    }
}
class CountryManager {
    constructor(countries) {
        this.countries = countries;
    }
    searchByName(term) {
        const lowerTerm = term.toLowerCase();
        return this.countries.filter(country => country.name.common.toLowerCase().includes(lowerTerm));
    }
    /**
     * Filtra países pela região (ex: "Europe", "Asia"...).
     */
    filterByRegion(region) {
        return this.countries.filter(country => country.region === region);
    }
}
exports.CountryManager = CountryManager;
//# sourceMappingURL=app.js.map