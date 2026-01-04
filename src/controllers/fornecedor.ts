import { Request, Response } from "express";
import { pool } from "../database/db";
import { Fornecedor } from "../models";

// Cadastro de fornecedor
// POST /fornecedores
export async function adicionarFornecedor(req: Request, res: Response) {
  try {
    const {
      nome_fantasia, razao_social, email, telefone_principal, telefone_alternativo = null, permissao_contato_cliente = false, cnpj, senha_hash, status_fornecedor = true }: Fornecedor = req.body;

      const verificaCnpj = await pool.query(`SELECT EXISTS (SELECT 1 FROM fornecedor WHERE cnpj = $1) AS cnpj_existe`, [cnpj]);
      
      const verificaEmail = await pool.query(`SELECT EXISTS (SELECT 1 FROM fornecedor WHERE email = $1) AS email_existe`, [email]);
        
      if (verificaCnpj.rows[0].cnpj_existe) {
        return res.status(400).json({
          message: "Este CNPJ já está cadastrado!",
          fornecedor: null
      });
    }

      if (verificaEmail.rows[0].email_existe) {
        return res.status(400).json({
          message: "Este e-mail já está cadastrado!",
          fornecedor: null
      });
    }

      const sql = 'INSERT INTO fornecedor(nome_fantasia, razao_social, email, telefone_principal, telefone_alternativo, permissao_contato_cliente, cnpj, senha_hash, status_fornecedor) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;';
      
      const values = [nome_fantasia, razao_social, email, telefone_principal, telefone_alternativo, permissao_contato_cliente, cnpj, senha_hash, status_fornecedor];
      
      const result = await pool.query(sql, values);
      
      return res.status(201).json({
        message: `Fornecedor ${result.rows[0].nome_fantasia} cadastrado com sucesso!`,
        fornecedor: result.rows[0]
      });

    } catch (error) {
      console.error("Erro ao cadastrar fornecedor: ", error);
      
      return res.status(500).json({
        message: "Erro ao cadastrar fornecedor",
        fornecedor: null
      });
    }
  }

// Exibe todos os fornecedores
// GET /fornecedores
export async function listarFornecedores(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM vw_Fornecedor");
    return res.status(200).json({
      message: `Foram encontrados ${result.rows.length} fornecedores.`,
      fornecedor: result.rows
    });

  } catch (error) {
    console.error("Erro ao exibir fornecedores: ", error);
    
    return res.status(500).json({
      message: "Erro ao buscar fornecedores",
      fornecedor: null
    });
  }
}

// Exibe fornecedor pelo ID
// GET /fornecedores/:id
export async function listarFornecedor(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const result = await pool.query("SELECT * FROM vw_fornecedor WHERE id_fornecedor = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Fornecedor não encontrado",
        fornecedor: null
      });
    }

    return res.status(200).json({
      message: `Fornecedor ${result.rows[0].nome_fantasia} encontrado com sucesso!`,
      fornecedor: result.rows[0]
    });

  } catch (error) {
    console.error(`Erro ao exibir fornecedor ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao buscar fornecedor",
      fornecedor: null
    });
  }
}

// Atualiza fornecedor pelo ID
// PUT /fornecedores/:id
export async function editarFornecedor(req: Request, res: Response) {
  try{
    const id = Number(req.params.id);
    
    const {
        nome_fantasia, razao_social, email, telefone_principal, telefone_alternativo = null, permissao_contato_cliente = false, cnpj, senha_hash, status_fornecedor = true }: Fornecedor = req.body;
        
        const sql = `UPDATE fornecedor SET nome_fantasia=$1, razao_social=$2, email=$3, telefone_principal=$4, telefone_alternativo=$5, permissao_contato_cliente=$6, cnpj=$7, senha_hash=$8, status_fornecedor=$9 WHERE id_fornecedor=$10 RETURNING *;`;

        const values = [nome_fantasia, razao_social, email, telefone_principal, telefone_alternativo, permissao_contato_cliente, cnpj, senha_hash, status_fornecedor, id];
        
        const result = await pool.query(sql, values);
        
        if (result.rows.length === 0) {
          return res.status(404).json({
            message: "Fornecedor não encontrado",
            fornecedor: null
          });
        }
        return res.status(200).json({
          message: `Fornecedor ${result.rows[0].nome_fantasia} atualizado com sucesso!`,
          fornecedor: result.rows[0],
        });

    } catch (error) {
    console.error(`Erro ao editar fornecedor ${req.params.id}: `, error);
    return res.status(500).json({
      message: "Erro ao editar fornecedor",
      fornecedor: null
    });
   }
  }


// Desativa fornecedor pelo ID
// DELETE /fornecedores/:id
export async function excluirFornecedor(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(`UPDATE fornecedor SET status_fornecedor = false WHERE id_fornecedor=$1 RETURNING *;`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Fornecedor não encontrado",
        fornecedor: null
      });
    }

    return res.status(200).json({
      message: `Fornecedor ${result.rows[0].nome_fantasia} excluído com sucesso!`,
      fornecedor: result.rows[0]
    });

  } catch (error) {
    console.error(`Erro ao excluir fornecedor ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao excluir fornecedor",
      fornecedor: null
    });
  }
}
