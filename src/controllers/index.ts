import { Request, Response } from "express";
import { pool } from "../database/db";
import { Cliente } from "../models";

// Health check da API
// GET /healthcheck
export const healthCheck = (_req: Request, res: Response) => {
  res.status(200).json({
    message: "ok",
  });
};

// Cadastro de cliente
// POST /clientes
export async function adicionarClientes(req: Request, res: Response) {
  try {
    const {
      nome, sobrenome, email, telefone_principal, telefone_alternativo = null, permissao_contato_fornecedor = false, cpf, vale_gas_ativo = false, senha_hash, data_nascimento, status_cliente = true}: Cliente = req.body;

      const verificaCpf = await pool.query(`SELECT EXISTS (SELECT 1 FROM cliente WHERE cpf = $1) AS cpf_existe`, [cpf]);
      
      const verificaEmail = await pool.query(`SELECT EXISTS (SELECT 1 FROM cliente WHERE email = $1) AS email_existe`, [email]);
        
      if (verificaCpf.rows[0].cpf_existe) {
        return res.status(400).json({
          message: "Este CPF já está cadastrado!",
          cliente: null
      });
    }

      if (verificaEmail.rows[0].email_existe) {
        return res.status(400).json({
          message: "Este e-mail já está cadastrado!",
          cliente: null
      });
    }

      const sql = 'INSERT INTO cliente(nome, sobrenome, email, telefone_principal, telefone_alternativo, permissao_contato_fornecedor, cpf, vale_gas_ativo, senha_hash, data_nascimento, status_cliente) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;';
      
      const values = [nome, sobrenome, email, telefone_principal, telefone_alternativo, permissao_contato_fornecedor, cpf, vale_gas_ativo, senha_hash, data_nascimento, status_cliente];
      
      const result = await pool.query(sql, values);
      
      return res.status(201).json({
        message: `Cliente ${result.rows[0].nome} cadastrado com sucesso!`,
        cliente: result.rows[0]
      });

    } catch (error) {
      console.error("Erro ao cadastrar cliente: ", error);
      
      return res.status(500).json({
        message: "Erro ao cadastrar cliente",
        cliente: null
      });
    }
  }

// Exibe todos os clientes
// GET /clientes
export async function listarClientes(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM vw_cliente");
    return res.status(200).json({
      message: `Foram encontrados ${result.rows.length} clientes.`,
      clientes: result.rows
    });

  } catch (error) {
    console.error("Erro ao exibir clientes: ", error);
    
    return res.status(500).json({
      message: "Erro ao buscar clientes",
      clientes: null
    });
  }
}

// Exibe cliente pelo ID
// GET /clientes/:id
export async function listarCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const result = await pool.query("SELECT * FROM vw_cliente WHERE id_cliente = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Cliente não encontrado",
        cliente: null
      });
    }

    return res.status(200).json({
      message: `Cliente ${result.rows[0].nome} encontrado com sucesso!`,
      cliente: result.rows[0]
    });

  } catch (error) {
    console.error(`Erro ao exibir cliente ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao buscar cliente",
      cliente: null
    });
  }
}

// Atualiza cliente pelo ID
// PUT /clientes/:id
export async function editarCliente(req: Request, res: Response) {
  try{
    const id = Number(req.params.id);
    
    const {
        nome, sobrenome, email, telefone_principal, telefone_alternativo = null, permissao_contato_fornecedor = false, cpf, vale_gas_ativo = false, senha_hash, data_nascimento, status_cliente = true}: Cliente = req.body;
        
        const sql = `UPDATE cliente SET nome=$1, sobrenome=$2, email=$3, telefone_principal=$4, telefone_alternativo=$5, permissao_contato_fornecedor=$6, cpf=$7, vale_gas_ativo=$8, senha_hash=$9, data_nascimento=$10, status_cliente=$11 WHERE id_cliente=$12 RETURNING *;`;

        const values = [nome, sobrenome, email, telefone_principal, telefone_alternativo, permissao_contato_fornecedor, cpf, vale_gas_ativo, senha_hash, data_nascimento, status_cliente, id];
        
        const result = await pool.query(sql, values);
        
        if (result.rows.length === 0) {
          return res.status(404).json({
            message: "Cliente não encontrado",
            cliente: null
          });
        }
        return res.status(200).json({
          message: `Cliente ${result.rows[0].nome} atualizado com sucesso!`,
          cliente: result.rows[0],
        });

    } catch (error) {
    console.error(`Erro ao editar cliente ${req.params.id}: `, error);
    return res.status(500).json({
      message: "Erro ao editar cliente",
      cliente: null
    });
   }
  }


// Desativa cliente pelo ID
// DELETE /clientes/:id
export async function excluirCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(`UPDATE cliente SET status_cliente = false WHERE id_cliente=$1 RETURNING *;`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Cliente não encontrado",
        cliente: null
      });
    }

    return res.status(200).json({
      message: `Cliente ${result.rows[0].nome} excluído com sucesso!`,
      cliente: result.rows[0]
    });

  } catch (error) {
    console.error(`Erro ao excluir cliente ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao excluir cliente",
      cliente: null
    });
  }
}

// Atualiza permissão de privacidade do Cliente
// PUT /clientes/:id/privacidade
// Body: {"permissao_contato_fornecedor": true/false}
export async function privacidadeCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { permissao_contato_fornecedor } = req.body;

    const result = await pool.query(`UPDATE cliente SET permissao_contato_fornecedor = $1 WHERE id_cliente=$2 RETURNING *;`, [permissao_contato_fornecedor, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Cliente não encontrado",
        cliente: null
      });
    }

    return res.status(200).json({
      message: `Configuração de privacidade do cliente ${result.rows[0].nome} atualizada com sucesso!`,
      cliente: result.rows[0]
    });

  } catch (error) {
    console.error(`Erro ao atualizar privacidade do cliente ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao atualizar privacidade do cliente",
      cliente: null
    });
  }
}

// Atualiza status do benefício Vale Gás do cliente
// PUT /clientes/:id/vale-gas
// Body: {"vale_gas_ativo": true/false}
export async function valeGasCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { vale_gas_ativo } = req.body;

    const result = await pool.query(`UPDATE cliente SET vale_gas_ativo = $1 WHERE id_cliente=$2 RETURNING *;`, [vale_gas_ativo, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Cliente não encontrado",
        cliente: null
      });
    }

    return res.status(200).json({
      message: `Status do benefício Vale Gás do cliente ${result.rows[0].nome} atualizado!`,
      cliente: result.rows[0]
    });

  } catch (error) {
    console.error(`Ocorreu um erro ao registrar a autodeclaração do Vale Gás: `, error);

    return res.status(500).json({
      message: "Erro ao registrar a autodeclaração do cliente",
      cliente: null
    });
  }
}

// Exibe todos os bairros
// GET /bairros
export async function listarBairros(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM bairro");
    return res.status(200).json({
      message: `Foram encontrados ${result.rows.length} bairros.`,
      bairros: result.rows
    });

  } catch (error) {
    console.error("Erro ao exibir bairros: ", error);
    
    return res.status(500).json({
      message: "Erro ao buscar bairros",
      bairros: null
    });
  }
}