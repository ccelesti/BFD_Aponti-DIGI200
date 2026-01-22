import { Request, Response } from "express";
import { pool } from "../database/db";

/**
 * Cria vínculo entre cliente e fornecedor, autorizando o compartilhamento de dados de contato e a visualização do nível de gás.
 * @route POST /vinculos
 * @param {number} req.body.id_cliente - ID do cliente.
 * @param {number} req.body.id_fornecedor - ID do fornecedor.
 */
export async function criarVinculoClienteFornecedor(req: Request, res: Response) {
  try {
    const { id_cliente, id_fornecedor } = req.body;

    if (!id_cliente || !id_fornecedor) {
      return res.status(400).json({
        message: "É obrigatório informar o id do cliente e o id do fornecedor"
      });
    }

    const vinculoExistente = await pool.query(`SELECT * FROM cliente_fornecedor WHERE id_cliente = $1 AND id_fornecedor = $2`, [id_cliente, id_fornecedor]);

    if (vinculoExistente.rows.length > 0) {
      return res.status(409).json({
        message: "Já existe vínculo entre este cliente e fornecedor."
  });
}

    const result = await pool.query(`INSERT INTO cliente_fornecedor (id_cliente, id_fornecedor, status_vinculo) VALUES ($1, $2, true) RETURNING *;`, [id_cliente, id_fornecedor]);

    return res.status(201).json({
      message: "Vínculo com fornecedor criado com sucesso!",
      vinculo: result.rows[0]
    });

  } catch (error) {
    console.error("Erro ao criar vínculo com fornecedor: ", error);

    return res.status(500).json({
      message: "Erro ao criar vínculo com fornecedor",
      vinculo: null
    });
  }
}

/**
 * Reativa um vínculo previamente cancelado entre cliente e fornecedor.
 * @route PUT /vinculos
 * @param {number} req.body.id_cliente - ID do cliente.
 * @param {number} req.body.id_fornecedor - ID do fornecedor.
*/
export async function reativarVinculoClienteFornecedor(req: Request, res: Response) {
    try {
        const { id_cliente, id_fornecedor } = req.body;
        
        if (!id_cliente || !id_fornecedor) {
      return res.status(400).json({
        message: "É obrigatório informar o id do cliente e o id do fornecedor"
      });
    }

    const result = await pool.query(`UPDATE cliente_fornecedor SET status_vinculo = true WHERE id_cliente = $1 AND id_fornecedor = $2 AND status_vinculo = false RETURNING *`, [id_cliente, id_fornecedor]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Vínculo cancelado não encontrado para reativação",
        vinculo: null
      });
    }

    return res.status(200).json({
      message: "Vínculo reativado com sucesso!",
      vinculo: result.rows[0]
    });
    
  } catch (error) {
    console.error("Erro ao reativar vínculo: ", error);
    
    return res.status(500).json({
        message: "Erro ao reativar vínculo entre cliente e fornecedor",
      vinculo: null
    });
  }
}

/**
 * Cancela (revoga) o vínculo entre cliente e fornecedor (soft delete).
 * @route DELETE /vinculos
 * @param {number} req.body.id_cliente - ID do cliente.
 * @param {number} req.body.id_fornecedor - ID do fornecedor.
 */
export async function cancelarVinculoClienteFornecedor(req: Request, res: Response) {
  try {
    const { id_cliente, id_fornecedor } = req.body;

    if (!id_cliente || !id_fornecedor) {
      return res.status(400).json({
        message: "É obrigatório informar o id do cliente e o id do fornecedor"
      });
    }

    const result = await pool.query(`UPDATE cliente_fornecedor SET status_vinculo = false WHERE id_cliente = $1 AND id_fornecedor = $2 AND status_vinculo = true RETURNING *`, [id_cliente, id_fornecedor]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Vínculo ativo entre cliente e fornecedor não encontrado",
        vinculo: null
      });
    }

    return res.status(200).json({
      message: "Vínculo com fornecedor cancelado com sucesso!",
      vinculo: result.rows[0]
    });

  } catch (error) {
    console.error("Erro ao cancelar vínculo com fornecedor: ", error);

    return res.status(500).json({
      message: "Erro ao cancelar vínculo com fornecedor",
      vinculo: null
    });
  }
}


