/* este código estar rodando em validações
import { off } from "node:cluster";
import { Cliente, Fornecedor, Endereco, Bairro } from "./models";

interface ResultadoValidacao {
  valido: boolean;
  erros: string[];
}

export class Validador {
  // --- 1. MÉTODOS AUXILIARES (PRIVADOS) ---
  private static apenasNumeros(valor: any): string {
    if (typeof valor !== 'string') return "";
    return valor.replace(/\D/g, '');
  }

  private static validarTexto(campo: string, valor: any, min: number = 3): string | null {
    if (!valor || typeof valor !== 'string') return `O Campo ${campo} é obrigatório e deve ser um texto.`;
    if (valor.trim().length < min) return `O Campo ${campo} deve ter no mínimo ${min} caracteres.`;
    return null;
  }

  private static validarCPF(cpf: any): string | null {
    const numeros = this.apenasNumeros(cpf);
    return numeros.length === 11 ? null : 'O CPF deve ter 11 dígitos.';
  }

  private static validarCNPJ(cnpj: any): string | null {
    const numeros = this.apenasNumeros(cnpj);
    return numeros.length === 14 ? null : 'O CNPJ deve ter 14 dígitos.';
  }

  private static validarTelefone(campo: string, valor: any, obrigatorio: boolean = true): string | null {
    if(!obrigatorio && (!valor || valor.toString().trim() === "")) return null;
    if(obrigatorio && !valor) return `O campo ${campo} é obrigatório.`
    const numeros = this.apenasNumeros(valor);
    return numeros.length >= 10 && numeros.length <= 11 ? null : `O ${campo} deve ter 10 ou 11 dígitos (com DDD).`;
    
  }

  // --- 2. VALIDAÇÃO DE BAIRRO ---
  static validarBairro(dados: Bairro): ResultadoValidacao {
    const erros: string[] = [];

    const eBairro = this.validarTexto("Nome do Bairro", dados.nome_bairro, 2);
    const eMunicipio = this.validarTexto("Município", dados.municipio, 3);
    const eEstado = this.validarTexto("Estado (UF)", dados.estado, 2);

    if (eBairro) erros.push(eBairro);
    if (eMunicipio) erros.push(eMunicipio);
    if (eEstado) erros.push(eEstado);
    
    return { valido: erros.length === 0, erros };
    
}

  // --- 3. VALIDAÇÃO DE ENDEREÇO (Pode validar o Bairro junto) ---
  static validarEndereco(dados: Endereco, bairro?: Bairro): ResultadoValidacao {
    let erros: string[] = [];

    const e1 = this.validarTexto("Logradouro", dados.endereco_logradouro, 5);
    const e2 = this.validarTexto("CEP", dados.cep, 8);
    if (e1) erros.push(e1);
    if (e2) erros.push(e2);

    if (bairro) {
      const resBairro = this.validarBairro(bairro);
      erros = erros.concat(resBairro.erros);
    }

    return { valido: erros.length === 0, erros };
  }

  // --- 4. VALIDAÇÃO DE CLIENTE ---
  static validarCliente(dados: Cliente, endereco?: Endereco, bairro?: Bairro): ResultadoValidacao {
    let erros: string[] = [];

    const e1 = this.validarTexto("Nome", dados.nome);
    const e2 = this.validarTexto("Sobrenome", dados.sobrenome);
    const e3 = this.validarCPF(dados.cpf);
    const e4 = this.validarEmail(dados.email);
    const e5 = this.validarTelefone("Telefone Principal", dados.telefone_principal);
    const e6 = this.validarTelefone("Telefone Alternativo", dados.telefone_alternativo);

    if (e1) erros.push(e1);
    if (e2) erros.push(e2);
    if (e3) erros.push(e3);
    if (e4) erros.push(e4);
    if (e5) erros.push(e5);
   // if (e6) erros.push(e6); 

    if (endereco) {
      const resEnd = this.validarEndereco(endereco, bairro);
      erros = erros.concat(resEnd.erros);
    }

    return { valido: erros.length === 0, erros };
  }

  // --- 5. VALIDAÇÃO DE FORNECEDOR ---
  static validarFornecedor(dados: Fornecedor, endereco?: Endereco, bairro?: Bairro): ResultadoValidacao {
    let erros: string[] = [];

    const e1 = this.validarTexto("Nome Fantasia", dados.nome_fantasia);
    const e2 = this.validarTexto("Razão Social", dados.razao_social);
    const e3 = this.validarCNPJ(dados.cnpj);
    const e4 = this.validarTelefone("Telefone Principal", dados.telefone_principal);

    if (e1) erros.push(e1);
    if (e2) erros.push(e2);
    if (e3) erros.push(e3);
    if (e4) erros.push(e4);

    if (endereco) {
      const resEnd = this.validarEndereco(endereco, bairro);
      erros = erros.concat(resEnd.erros);
    }

    return { valido: erros.length === 0, erros };
  }

  private static validarEmail(email: any): string | null {
    if(!email || typeof email !== 'string') return "O e-mail é obrigatório.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "O E-mail informado é inválido (ex: usuario@dominio.com).";
  }
  return null;
    }

}
*/

/*
import { Cliente, Fornecedor, Endereco, Bairro } from "./models";

export function rodarMeusTestes() {
    console.log("Iniciando testes de validação...");

    const clienteExemplo: any = {
        nome: "João",
        cpf: "12345678901",
        telefone_principal: "11999998888"
    };

    const resultado = Validador.validarCliente(clienteExemplo);
    console.log("Resultado do Teste:", resultado);
}


interface ResultadoValidacao {
  valido: boolean;
  erros: string[];
}

export class Validador {
  // --- 1. MÉTODOS AUXILIARES (PRIVADOS) ---
  private static apenasNumeros(valor: any): string {
    if (typeof valor !== 'string') return "";
    return valor.replace(/\D/g, '');
  }

  private static validarTexto(campo: string, valor: any, min: number = 3): string | null {
    if (!valor || typeof valor !== 'string') return `O Campo ${campo} é obrigatório e deve ser um texto.`;
    if (valor.trim().length < min) return `O Campo ${campo} deve ter no mínimo ${min} caracteres.`;
    return null;
  }

  private static validarCPF(cpf: any): string | null {
    const numeros = this.apenasNumeros(cpf);
    return numeros.length === 11 ? null : 'O CPF deve ter 11 dígitos.';
  }

  private static validarCNPJ(cnpj: any): string | null {
    const numeros = this.apenasNumeros(cnpj);
    return numeros.length === 14 ? null : 'O CNPJ deve ter 14 dígitos.';
  }

  private static validarTelefone(campo: string, valor: any): string | null {
    const numeros = this.apenasNumeros(valor);
    return numeros.length >= 10 && numeros.length <= 11 ? null : `O ${campo} deve ter 10 ou 11 dígitos (com DDD).`;
  }

  // --- 2. VALIDAÇÃO DE BAIRRO ---
  static validarBairro(dados: Bairro): ResultadoValidacao {
    const erros: string[] = [];
    const e1 = this.validarTexto("Nome do Bairro", dados.nome_bairro, 2);
    const e2 = this.validarTexto("Município", dados.municipio, 3);
    const e3 = this.validarTexto("Estado (UF)", dados.estado, 2);

    if (e1) erros.push(e1);
    if (e2) erros.push(e2);
    if (e3) erros.push(e3);

    return { valido: erros.length === 0, erros };
  }

  // --- 3. VALIDAÇÃO DE ENDEREÇO (Pode validar o Bairro junto) ---
  static validarEndereco(dados: Endereco, bairro?: Bairro): ResultadoValidacao {
    let erros: string[] = [];

    const e1 = this.validarTexto("Logradouro", dados.endereco_logradouro, 5);
    const e2 = this.validarTexto("CEP", dados.cep, 8);
    if (e1) erros.push(e1);
    if (e2) erros.push(e2);

    if (bairro) {
      const resBairro = this.validarBairro(bairro);
      erros = erros.concat(resBairro.erros);
    }

    return { valido: erros.length === 0, erros };
  }

  // --- 4. VALIDAÇÃO DE CLIENTE ---
  static validarCliente(dados: Cliente, endereco?: Endereco, bairro?: Bairro): ResultadoValidacao {
    let erros: string[] = [];

    const e1 = this.validarTexto("Nome", dados.nome);
    const e2 = this.validarTexto("Sobrenome", dados.sobrenome);
    const e3 = this.validarCPF(dados.cpf);
    const e4 = this.validarTelefone("Telefone Principal", dados.telefone_principal);

    if (e1) erros.push(e1);
    if (e2) erros.push(e2);
    if (e3) erros.push(e3);
    if (e4) erros.push(e4);

    if (endereco) {
      const resEnd = this.validarEndereco(endereco, bairro);
      erros = erros.concat(resEnd.erros);
    }

    return { valido: erros.length === 0, erros };
  }

  // --- 5. VALIDAÇÃO DE FORNECEDOR ---
  static validarFornecedor(dados: Fornecedor, endereco?: Endereco, bairro?: Bairro): ResultadoValidacao {
    let erros: string[] = [];

    const e1 = this.validarTexto("Nome Fantasia", dados.nome_fantasia);
    const e2 = this.validarTexto("Razão Social", dados.razao_social);
    const e3 = this.validarCNPJ(dados.cnpj);
    const e4 = this.validarTelefone("Telefone Principal", dados.telefone_principal);

    if (e1) erros.push(e1);
    if (e2) erros.push(e2);
    if (e3) erros.push(e3);
    if (e4) erros.push(e4);

    if (endereco) {
      const resEnd = this.validarEndereco(endereco, bairro);
      erros = erros.concat(resEnd.erros);
    }

    return { valido: erros.length === 0, erros };
  }

  
}

*/