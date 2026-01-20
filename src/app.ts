import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { Validador, ClienteCompletoDTO } from "./validacoes";

dotenv.config();


const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

    // --- 🧪 TESTE DE VALIDAÇÃO UNIFICADA ---
  
  // 1. Montamos o objeto com os dados que estavam "soltos"
  const dadosParaCadastro: ClienteCompletoDTO = {
    cliente: {
      nome: 'Jackes Luis de',
      sobrenome: 'Martins', // Campo obrigatório corrigido
      cpf: '123.456.789-01',
      email: 'pedro@teste.com', // Formato com @ e . corrigido
      telefone_principal: '81.9 9633-5654', // 11 dígitos com DDD
      telefone_alternativo: '', // Opcional, não gera erro se vazio
      senha_hash: '123abc78',
      data_nascimento: '25-12-1975' // Formato yyyy-mm-dd
    },
    endereco: {
      endereco_logradouro: 'Rua da Amora',
      cep: '53130123',
      id_bairro: 0 // Será preenchido pelo banco após o insert do bairro
    },
    bairro: {
      nome_bairro: 'Rio Doce',
      municipio: 'Olinda',
      estado: 'PE' // Exatamente 2 caracteres
    }
  };

  // 2. Chamamos o Método Mestre de Validação
  console.log('\n--- Iniciando Validação de Cadastro Completo ---');
  const resultado = Validador.validarRegistroCompleto(dadosParaCadastro);

  // 3. Exibimos o resultado formatado no console
  if (resultado.valido) {
    console.log('✅ SUCESSO: Todos os dados estão corretos!');
    console.log('-------------------------------------------');
    console.log(`Nome | Sobrenome: ${dadosParaCadastro.cliente.nome} ${dadosParaCadastro.cliente.sobrenome}`);
    console.log(`CPF: ${dadosParaCadastro.cliente.cpf}`);
    console.log(`Telefone Principal: ${dadosParaCadastro.cliente.telefone_principal}`);
    console.log(`Telefone Alternativo: ${dadosParaCadastro.cliente.telefone_alternativo}`);
    console.log(`Data Nascimento: ${dadosParaCadastro.cliente.data_nascimento}`);
    const senhaOculta = "*".repeat(dadosParaCadastro.cliente.senha_hash.length);
    console.log(`Senha: ${senhaOculta}`);
    //console.log(`Senha: ${dadosParaCadastro.cliente.senha_hash}`);
    console.log(`Endereço | Bairro: ${dadosParaCadastro.endereco.endereco_logradouro}, ${dadosParaCadastro.bairro.nome_bairro}`);
    console.log(`Cidade | UF: ${dadosParaCadastro.bairro.municipio}/${dadosParaCadastro.bairro.estado}`);
    console.log('-----------------------------------------------');
  } else {
    console.log('❌ ERRO DE VALIDAÇÃO:');
    resultado.erros.forEach((erro, index) => {
      console.log(`${index + 1}. ${erro}`);
    });

    
  }


    /*
    //const resultaoFornecdor = Validador.validarFornecedor(dados)

console.log(Validador.validarFornecedor({
  razao_social: 'Almir Slan',
  nome_fantasia: `Casas Bahia`,
  cnpj: `62.326.348/0001-11`,
  email: 'contato@bahia.com',
  telefone_principal: '81996335654',
  telefone_alternativo: '81934329781',
  rua: 'Rua Do Conhecimento',
  bairro: 'Casa Amarela',
  cidade: 'Olinda',
  senha: '123fgtr'
})

);
*/
