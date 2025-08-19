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

  export interface ICountry {
  name: {
    common: string;
    official: string;
  };
  region: Region;
  subregion?: string;
  capital?: string[];
  population: number;
  flags: {
    svg: string;
    png: string;
  };
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

import express, {Request,Response} from'express';
import validationBr from 'validation-br';

import { get } from 'http';
import cep from 'cep-promise';


import axios from "axios";


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("🌍 API de Países rodando com TypeScript");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

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


app.get("/valida-cpf/:cpf", (req: Request<{ cpf:"string"}> , res: Response) => {
  if(validationBr.isCPF(req.params.cpf)){
    return res.send("cpf valido")
  } else{
    return res.send ("cpf invalido")
  }
});

  app.get("/valida-cnpj/:cnpj", (req: Request<{ cpf:"string"}> , res: Response) => {
  if(validationBr.isCNPJ(req.params.cpf)){
    return res.send("cnpj valido")
  } else{
    return res.send ("cnpj invalido")
  }
});
  app.get("/valida-cnh/:cnh", (req: Request<{ cnh:"string"}> , res: Response) => {
  if(validationBr.isCNH(req.params.cnh)){
    return res.send("cnh valido")
  } else{
    return res.send("cnh invalido")
   }})

   app.get('/valida-cep/:cep', async (req: Request<{ cep: string | number }>, res: Response) => {
   const dados: any = await cep(req.params.cep)
                            .then((data) => { return data})
                            .catch((err) => { return err });
    return res.json({ dados:  dados });
   })

//import cep from 'cep-promise';
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


export class CountryService {
  private apiUrl = "https://restcountries.com/v3.1/all";
  private countries: ICountry[] = [];

  // Carrega os dados da API e armazena em memória
  public async loadCountries(): Promise<void> {
    if (this.countries.length === 0) {
      const response = await axios.get<ICountry[]>(this.apiUrl);
      this.countries = response.data;
    }
  }
public getAll(): ICountry[] {
    return this.countries;
  }
  // Pesquisa por nome
  public searchByName(name: string): ICountry[] {
    return this.countries.filter((Country) =>
      Country.name.common.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filtra por região
  public filterByRegion(region: string): ICountry[] {
    return this.countries.filter(
      (Country) => Country.region.toLowerCase() === region.toLowerCase()
    );
  }
}
// 🔍 Buscar todos os países
app.get("/countries", async (_req: Request, res: Response) => {
  try {
    const response = await axios.get<ICountry[]>("https://restcountries.com/v3.1/all");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar países" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});


export interface ICountry {
  name: ICountryName;
  region: Region;
  subregion?: string;
  capital?: string[];
  population: number;
  flags: ICountryFlags;
}

export interface ICountryName {
  common: string;
  official: string;
}

export interface ICountryFlags {
  svg: string;
  png: string;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania"
}
