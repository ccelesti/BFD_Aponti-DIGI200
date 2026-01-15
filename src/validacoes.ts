// Interface para padronizar a resposta de erro
console.log('\nvalidacoes.ts carregado!');
interface ResultadoValidacao {
  valido: boolean;
  erros: string[];
}

// 1. Auxiliar: Remove tudo que não for número (limpa pontos, traços e barras)
export class Validador {
private static apenasNumeros(valor: any): string{
    console.log('\nvalidacoes.ts carregado!');
    if (typeof valor !== 'string') return "";
    return valor.replace(/\D/g, '');
}

// 2. Validação de Texto Simples (Nome, Bairro, Endereço)
private static validarTexto (campo: string, valor: any, min: number = 3): string | null {
    console.log(`validando texto: "${campo}" = "${valor}"`);
    if (typeof valor !== 'string') return `O Campo ${campo} deve ser um texto.`;
    if (valor.trim().length < min) return `O Campo ${campo} deve ter no minímo ${min} Caracteres`;
    return null;
}

// 3. Validação de CPF (11 dígitos)
private static validarCPF(cpf: any): string | null {
    console.log('validando CPF:', cpf) ?? '';
    const numeros = this.apenasNumeros(cpf);
    if (numeros.length !== 11) return "O CPF deve ter exatamente 11 dígitos numéricos.";
    return null;
}

// 4. Validação de CNPJ (14 dígitos)
private static validarCNPJ(cnpj: any): string | null {
    console.log('validando CNPJ:', cnpj);
    const numeros = this.apenasNumeros(cnpj ?? '');
   // console.log('números CNPJ:', numeros, 'length:', numeros.length);
    if (numeros.length !== 14) return "O CNPJ deve conter exatamente 14 dígitos numéricos.";
    return null;
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
    const erroCnpj = this.validarCNPJ(dados.cnpj);
    const erroEnderecoFornecedor = this.validarTexto("O Endereço", dados.endereco, 5);

    return {valido: erros.length ===0, erros};
}

}
/*
const teste = Validador.validarFornecedor({ nome: "Empresa X", cnpj: "123", endereco: "Rua" });
console.log(Validador); // Deve retornar valido: false e a lista de erros de dígitos e tamanho. */
