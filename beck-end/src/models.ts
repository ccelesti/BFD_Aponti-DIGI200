
export interface Cliente {
  id_cliente?: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone_principal: string;
  telefone_alternativo?: string | null;
  permissao_contato_fornecedor?: boolean;
  cpf: string;
  vale_gas_ativo?: boolean;
  senha_hash: string;
  data_nascimento: string; // yyyy-mm-dd
  criado_em?: string;
  atualizado_em?: string;
  status_cliente?: boolean;
  //status_iot_cliente: string;
}
export type ClienteExibicao = Omit<Cliente, 'senha_hash'>;

export interface Fornecedor {
  id_fornecedor?: number;
  nome_fantasia: string;
  razao_social: string;
  email: string;
  telefone_principal: string;
  telefone_alternativo?: string | null;
  permissao_contato_cliente?: boolean;
  cnpj: string;
  senha_hash: string;
  criado_em?: string;
  atualizado_em?: string;
  status_fornecedor?: boolean;
}

export type FornecedorExibicao = Omit<Fornecedor, 'senha_hash'>;

export interface Bairro {
  id_bairro?: number;
  nome_bairro: string;
  municipio: string;
  estado: string;
}

export interface Endereco {
  id_endereco?: number;
  cep: string;
  endereco_logradouro: string;
  numero?: string;
  complemento?: string | null;
  id_bairro: number;
}

export interface ClienteFornecedor {
  id_cliente: number;
  id_fornecedor: number;
  status_vinculo?: boolean;
}

export interface HorarioFuncionamento {
  id_funcionamento?: number;
  dia_funcionamento: number; // 1–7
  horario_inicio?: string | null;   // HH:MM:SS
  horario_termino?: string | null;  // HH:MM:SS
  esta_aberto?: boolean;
  id_fornecedor: number;
}

export interface EnderecoCliente {
  id_endereco_cliente?: number;
  nome_endereco?: string;
  id_cliente: number;
  id_endereco: number;
  criado_em?: string;
  atualizado_em?: string;
}

export interface BairroAtendidoFornecedor {
  id_fornecedor: number;
  id_bairro: number;
}

// export interface SensorMedicaoGas {
//   id_medidor?: number;
//   id_cliente?: number;
//   nome_endereco_Sensor: string;
//   status_Sensor: string;
//   status_iot_cliente: string; 
//   tipo_gas: string;
// }
