import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { Validador } from "./validacoes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//console.log('validacoes.ts carregado!\n');

console.log(Validador.validarCliente({
  nome: 'Rubinho',
  cpf: '123.456.789-11',
  endereco: 'Rua da amora',
  bairro: 'Rio Doce'
}));
console.log()
console.log(Validador.validarFornecedor({
  razaoSocial: 'Almir Slan',
  nome: `Casas Bahia`,
  cnpj: `62.326.348/0001-70`,
  email: 'contato@bahia.com',
  whatsapp: '81996335654',
  telefone: '81934329781',
  rua: 'Rua Do Conhecimento',
  bairro: 'Casa Amarela',
  cidade: 'Olinda',
  senha: '123fgtr'
}));

