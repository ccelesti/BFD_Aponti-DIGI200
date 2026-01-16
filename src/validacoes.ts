// Interface para padronizar a resposta de erro
console.log('\nvalidacoes.ts carregado!\n');
interface ResultadoValidacao {
  valido: boolean;
  erros: string[];
}

// 1. Auxiliar: Remove tudo que não for número (limpa pontos, traços e barras)
export class Validador {
private static apenasNumeros(valor: any): string{
   // console.log('\nvalidacoes.ts carregado!');
    if (typeof valor !== 'string') return "";
    return valor.replace(/\D/g, '');
}

// 2. Validação de Texto Simples (Nome, Bairro, Endereço)
private static validarTexto (campo: string, valor: any, min: number = 3): string | null {
    const valorExibido = campo.toLowerCase().includes('senha') ? '********' : valor;
    console.log(`validando texto: "${campo}" = "${valorExibido}"`);
    if (typeof valor !== 'string') return `O Campo ${campo} deve ser um texto.`;
    if (valor.trim().length < min) return `O Campo ${campo} deve ter no minímo ${min} Caracteres`;
    return null;
}

// 3. Validação de CPF (11 dígitos)
private static validarCPF(cpf: any): string | null {
    console.log('validando CPF:', cpf);
    const numeros = this.apenasNumeros(cpf);
    console.log('Números CPF:', numeros, 'length', numeros.length);
    if (numeros.length !== 11) {
         console.log('Erro CPF:', 'Deve ter 11 dígitos'); 
        return 'O CPF deve ter exatamente 11 dígitos numéricos.';
    }return null;
}

// 4 Validação de CNPJ (14 dígitos)
private static validarCNPJ(cnpj: any): string | null {
    console.log('validando CNPJ:', cnpj);
    const numeros = this.apenasNumeros(cnpj);
    console.log('números CNPJ:', numeros, 'length:', numeros.length);
    if (numeros.length !== 14) {
        console.log('ERRO CNPJ:', 'Deve ter 14 dígitos');
        return 'O CNPJ deve conter exatamente 14 dígitos numéricos.';
    }return null;
}

// --- VALIDAÇÃO DE CLIENTE ---
static validarCliente(dados: any): ResultadoValidacao {
    const erros: string [] = [];
    
    const erroNome = this.validarTexto("Nome do Cliente", dados.nome);
    const erroCpf = this.validarCPF(dados.cpf);
    const erroEndereco = this.validarTexto("Endereço", dados.endereco, 5);
    const erroBairro = this.validarTexto("Bairro", dados.bairro, 2);
    
    if (erroNome) erros.push(erroNome);
    if (erroCpf) erros.push(erroCpf);
    if (erroEndereco) erros.push(erroEndereco);
    if (erroBairro) erros.push(erroBairro);
    
    return {valido: erros.length === 0, erros };
}

// --- VALIDAÇÃO DE FORNECEDOR ---
static validarFornecedor(dados: any): ResultadoValidacao {
    const erros: string[] = [];

    const erroNomeFornecedor = this.validarTexto("O Nome do Fornecedor", dados.nome);
    if (erroNomeFornecedor) erros.push(erroNomeFornecedor);

    const erroCnpj = this.validarCNPJ(dados.cnpj);
    if (erroCnpj) erros.push(erroCnpj);

    const erroRazao = this.validarTexto('Razão Social', dados.razaoSocial);
    if (erroRazao) erros.push(erroRazao);

    const erroEmail = this.validarTexto('E-mail', dados.email);
    if (erroEmail) erros.push(erroEmail);

    const erroWhatsapp = this.validarTelefone('Whatsapp',dados.whatsapp);
    if (erroWhatsapp) erros.push(erroWhatsapp);

    const erroTelefone = this.validarTelefone('Telefone',dados.telefone);
    if (erroTelefone) erros.push(erroTelefone);

    const erroRua = this.validarTexto('Rua', dados.rua);
    if (erroRua) erros.push(erroRua);

    const erroBairro = this.validarTexto('Bairro', dados.bairro, 2);
    if (erroBairro) erros.push(erroBairro);

    const erroCidade = this.validarTexto('Cidade', dados.cidade);
    if (erroCidade) erros.push(erroCidade);

    const erroSenha = this.validarTexto('Senha', dados.senha)
    if (erroSenha) erros.push(erroSenha);
    return {valido: erros.length ===0, erros};
}

// 5. Validação de Telefone/WhatsApp (DDD + 9 dígitos = 11 números)
private static validarTelefone(campo: string, valor: any): string | null {
    if(!valor) return `O campo ${campo} é obrigatório.`;
    
    // Limpa a string deixando apenas números
    const numeros = this.apenasNumeros(valor);
    //console.log(`validando ${campo}: "${valor}" -> números: ${numeros} (tamanho: ${numeros.length})`);
    
    console.log(`validando campo ${campo}:`, valor);
    if (numeros.length !== 11) {
        return `O campo ${campo} deve ter exatamente 11 dígitos (DDD + número).`;
    }return null;
}

}