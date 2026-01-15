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

console.log('validacoes.ts carregado!\n');

console.log(Validador.validarFornecedor({
  nome: `Aqui tem X`,
  cnpj: `123456789`,
  endereco: 'Rua Destino'
}));

