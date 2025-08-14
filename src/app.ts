console.log("hello type script")
let nome: string = "cristina";
let ano: number = 2025
console.log (nome)
console.log (ano)
let estoque:boolean = true
console.log (estoque)
let numeros: number [] = [1,2,3]
console.log (numeros)
let preco: number = 1000
console.log (preco)
let categoria: string [] = ["categoria", "tamanho", "cor"]
console.log (categoria)
let coordenadas: [string, string] = ["latitude", "longitude"] 
console.log (coordenadas)
enum statospedido{
    Pendente, Processando, Entregue, Cancelado
}
let pedido: statospedido = statospedido.Cancelado
console.log (pedido)
interface produto {
    nome: string, 
    preco: number,
    estoque: boolean
}
let produto: produto = {
    preco: 100,
    estoque: true,nome:"notebook"
    }

function exibirproduto (produto:produto) {
    console.log ("o nome do produto e "+ produto.nome) 
    console.log (" o preco do produto e"+ produto.preco)
}
exibirproduto (produto)

// Definindo a interface de usuário
interface IUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}
interface IProduct {    
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    categories: string;
    age: number;
}
    
type UserRole = 'admin' | 'user';
interface IAdminUser extends IUser {
    role: UserRole;
}
const user1: IUser = {
    id: 1,
    name: "Maria Cecilia",
    email: "aldericristina@gmail.com",
    isActive: true,
    age: 30,
    }

const product: IProduct = {
  id: 101,
  name: "Aquário de Vidro 50L",
  price: 299.90,
  inStock: true,
  categories: "aquario",
  age: 30,
};

const adminUser: IAdminUser = {
  id: 2,
  name: "Joao da Silva",
  email: "aldericristina@gmail.com",
  isActive: true,
  role: "admin",
  age: 40

}

// Impressão no console
console.log("Usuário comum:","user1");
console.log("Produto:", product);
console.log("Usuário administrador:", adminUser);


// src/app.ts

// Definição das interfaces
interface IUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  age: number;
}

interface IProduct {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// 1️⃣ Função genérica que retorna o mesmo array
function getData<T>(items: T[]): T[] {
  return items;
}

// 2️⃣ Função genérica que retorna item pelo ID
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Exemplos de uso

// Strings
const stringArray = getData<string>(["Peixe", "Aquário", "Filtro"]);
console.log("Array de strings:", stringArray);

// Números
const numberArray = getData<number>([10, 20, 30, 40]);
console.log("Array de números:", numberArray);

// Objetos IUser
let users: IUser[] = [
  { id: 1, name: "Maria Cecilia", email: "aldericristina@gmail.com", isActive: true, age: 30},
  { id: 2, name: "Joao da Silva", email: "aldericristina@gmail.com", isActive: false , age:40},
  ];
const userArray = getData<IUser>(users);
console.log("Array de usuários:", userArray);

// Objetos IProduct
const products: IProduct[] = [
  { id: 101, name: "Aquário 50L", price: 299.90, inStock: true, categories: "aquario" , age:35},
  { id: 102, name: "Filtro Externo", price: 159.50, inStock: false, categories:"filtro", age: 45}
];

// Testando getById com usuários
const foundUser = getById<IUser>(users, 1);
console.log("Usuário encontrado (ID 1):", foundUser);

// Testando getById com produtos
const foundProduct = getById<IProduct>(products, 102);
console.log("Produto encontrado (ID 102):", foundProduct);



// Interface IUser
interface IUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Array de usuários em memória
let users2: IUser[] = [
  { id: 1, name: "Maria Cecilia", email: "joao@example.com", isActive: true, age:45},
  { id: 2, name: "Joao da Silva", email: "maria@example.com", isActive: false,age:50}
];

// Função simples de validação
function isValidUser(obj: any): obj is IUser {
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.isActive === "boolean"
  );
}

import express, {Request,Response} from 'express';
import { get } from 'http';
const app = express();
app.use(express.json());

// GET /users → retorna todos
app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

// GET /users/:id → retorna usuário por ID
app.get("/users/:id", (req: Request<{ id: string }>, res: Response<IUser | { error: string }>) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.json(user);
});

// POST /users → adiciona usuário
app.post("/users", (req: Request<{}, {}, IUser>, res: Response<IUser | { error: string }>) => {
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
app.put("/users/:id", (req: Request<{ id: string }, {}, Partial<IUser>>, res: Response<IUser | { error: string }>) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

//   users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// DELETE /users/:id → remove usuário
app.delete("/users/:id", (req: Request<{ id: string }>, res: Response<{ message: string }>) => {
  const id = parseInt(req.params.id, 10);
  users = users.filter(u => u.id !== id);
  res.json({ message: "Usuário removido com sucesso" });
});

// Inicia o servidor
app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000")})
//git checkout -b NovaBranch
//git add .
//git commit -m “adicionado validacao de cpf”
git remote add origin https://github.com/JeanEdiel/tech-skills.git


