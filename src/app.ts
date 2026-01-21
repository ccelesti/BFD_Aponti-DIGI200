import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { Validador, ClienteCompletoDTO, FornecedorCompletoDTO } from "./validacoes";


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
      cpf: '12345678901',
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

   
  };
  
const dadosForn: FornecedorCompletoDTO = {
    fornecedor: {
        nome_fantasia: 'Distribuidora Alvorada',
        razao_social: 'Alvorada Alimentos LTDA',
        cnpj: '123456780199', 
        email: 'vendasalvorada.com', 
        telefone_principal: '45678901',
        telefone_alternativo: '08134329781',
        senha_hash: '87654'
    },
    endereco: {
        endereco_logradouro: 'Rua Industrial, 500',
        cep: '54000123', // 8 caracteres exatos
        id_bairro: 0
    },
    bairro: {
        nome_bairro: 'Jardim Atlântico',
        municipio: 'Olinda',
        estado: 'PE'
    }
};

const relatorio = Validador.validarFornecedorCompleto(dadosForn);

if (relatorio.valido) {
    console.log('\n--- 📝 RELATÓRIO DO FORNECEDOR ---');
    console.log('✅ FORNECEDOR TOTALMENTE VÁLIDO');
    console.log('-------------------------------------------');
    
    // Dados da Empresa (Fornecedor)
    console.log(`Nome Fantasia: ${dadosForn.fornecedor.nome_fantasia}`);
    console.log(`Razão Social: ${dadosForn.fornecedor.razao_social}`);
    console.log(`CNPJ: ${dadosForn.fornecedor.cnpj}`);
    console.log(`E-mail: ${dadosForn.fornecedor.email}`);
    console.log(`Telefone Principal: ${dadosForn.fornecedor.telefone_principal}`);
    
    // Máscara de Senha (como na imagem do cliente)
    const senhaMascarada = "*".repeat(dadosForn.fornecedor.senha_hash.length);
    console.log(`Senha: ${senhaMascarada}`);
    
    // Dados de Localização Unificados
    console.log(`Endereço | Bairro: ${dadosForn.endereco.endereco_logradouro}, ${dadosForn.bairro.nome_bairro}`);
    console.log(`Cidade | UF: ${dadosForn.bairro.municipio}/${dadosForn.bairro.estado}`);
    console.log(`CEP: ${dadosForn.endereco.cep}`);
    
    // Exibição do Bairro Atendido (se houver)
    if (dadosForn.bairroAtendido) {
        console.log(`Área de Atendimento: ${dadosForn.bairroAtendido.nome_bairro}`);
    }
    
    console.log('-------------------------------------------');
} else {
    console.log('\n❌ ERRO NA VALIDAÇÃO DO FORNECEDOR:');
    relatorio.erros.forEach((erro, index) => {
        console.log(`${index + 1}. ${erro}`); // Aqui resolve a "soma" numerada
    });
}


  


    
    



