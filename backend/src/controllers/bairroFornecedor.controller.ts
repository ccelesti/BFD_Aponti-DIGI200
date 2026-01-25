import { Request, Response } from "express";
import { pool } from "../database/db";
import { BairroAtendidoFornecedor} from "../models";

/**
 * Adiciona um novo bairro à área de atendimento de um fornecedor específico.
 * @route POST /fornecedores/:id/areas
 * @param {string} req.params.id - ID do fornecedor.
 * @param {number} req.body.id_bairro - ID do bairro a ser vinculado.
 */
export async function adicionarBairrosAtendidos(req: Request, res: Response) {
    try {
    const id_fornecedor = Number(req.params.id);
    const {id_bairro}: BairroAtendidoFornecedor = req.body;
    
    const bairroAtendido = await pool.query(`SELECT 1 FROM Bairro_Atendido_Fornecedor WHERE id_fornecedor = $1 AND id_bairro = $2`, [id_fornecedor, id_bairro]
    );

    if (bairroAtendido.rowCount && bairroAtendido.rowCount > 0) {
      return res.status(409).json({
        message: `Este fornecedor já atende o bairro ${id_bairro}`
      })
    }
    const sql = 'INSERT INTO Bairro_Atendido_Fornecedor(id_fornecedor, id_bairro) VALUES ($1, $2) RETURNING *;';
      
    const values = [id_fornecedor,id_bairro];
      
    const result = await pool.query(sql, values);

    if (result.rows.length === 0) {
      return res.status(200).json({        
        message: "O bairro já estava cadastrado para este fornecedor."
    });
    }
      
    return res.status(201).json({
        message: `Área de atendimento cadastrada com sucesso (Fornecedor ${id_fornecedor}, Bairro ${id_bairro})!`,
        bairroAtendido: result.rows[0]
    });

    } catch (error) {
      console.error("Erro ao cadastrar Área: ", error);
      
      return res.status(500).json({
        message: "Erro ao cadastrar Área",
        bairroAtendido: null
      });
    }
  }
  
/**
 * Exibe todos os bairros atendidos pelos fornecedores cadastrados no sistema.
 * * @route GET /fornecedores/areas
 */
export async function listarBairrosAtendidos(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM vw_Bairro_Atendido_Fornecedor ORDER BY nome_fantasia, nome_bairro");

    return res.status(200).json({
      message: `Foram encontrados ${result.rows.length} registros`,
      bairros: result.rows
    });

  } catch (error) {
    console.error("Erro ao exibir bairros atendidos: ", error);
    
    return res.status(500).json({
      message: "Erro ao buscar bairros atendidos",
      fornecedor: null
    });
  }
}

/**
 * Exibe todos os bairros atendidos por um fornecedor específico.
 * @route GET /fornecedores/:id/areas-atendidas
 * @param {string} req.params.id - ID do fornecedor.
 */
export async function listarBairroAtendido(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const fornecedor = await pool.query("SELECT id_fornecedor, nome_fantasia FROM Fornecedor WHERE id_fornecedor = $1", [id]);

    if (fornecedor.rows.length === 0) {
      return res.status(404).json({
        message: "Fornecedor não encontrado",
        bairroFornecedor: null
      });
    }

    const result = await pool.query(`SELECT * FROM vw_Bairro_Atendido_Fornecedor WHERE id_fornecedor = $1`, [id]);

    return res.status(200).json({
      message: `Fornecedor ${result.rows[0].nome_fantasia} encontrado com sucesso!`,
      bairroFornecedor: result.rows
    });

  } catch (error) {
    console.error(`Erro ao buscar áreas atendidas do fornecedor ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao buscar áreas atendidas",
      bairroFornecedor: null
    });
  }
}

/**
 * Atualiza um bairro específico na área de atendimento de um fornecedor específico.
 * * @route PUT /fornecedores/:id/areas/:id_bairro
 * @param {string} req.params.id - ID do fornecedor.
 * @param {string} req.params.id_bairro - ID do bairro atual.
 * @param {number} req.body.id_bairro_novo - Novo ID do bairro a ser definido.
 */
export async function editarBairroFornecido(req: Request, res: Response) {
  try{
    const id_fornecedor = Number(req.params.id);
    const id_bairro = Number(req.params.id_bairro);
    
    const {id_bairro_novo} = req.body;
    
    if (!id_bairro_novo) {
      return res.status(400).json({
        message: "Informe o campo id_bairro_novo no corpo da requisição."
      });
    }

    const sql = 'UPDATE Bairro_Atendido_Fornecedor SET id_bairro = $1 WHERE id_fornecedor = $2 AND id_bairro = $3 RETURNING *';
      
    const values = [id_bairro_novo, id_fornecedor, id_bairro ];
      
        const result = await pool.query(sql, values);
        
        if (result.rows.length === 0) {
          return res.status(404).json({
            message: "Área de atendimento não encontrada para este fornecedor",
            bairroFornecedor: null
          });
        }
        return res.status(200).json({
          message: `Área atualizada com sucesso!`,
          bairroFornecedor: result.rows
        });

    } catch (error) {
    console.error(`Erro ao editar área ${req.params.id}: `, error);
    return res.status(500).json({
      message: "Erro ao editar área",
      bairroFornecedor: null
    });
   }
  }


/**
 * Remove um bairro específico da área atendida por um fornecedor específico.
 * @route DELETE /fornecedores/:id/areas/:id_bairro
 * @param {string} req.params.id - ID do fornecedor.
 * @param {string} req.params.id_bairro - ID do bairro a ser removido.
 */
export async function excluirBairroAtendido(req: Request, res: Response) {
  try {
    const id_fornecedor = Number(req.params.id);
    const id_bairro = Number(req.params.id_bairro);
    
    const result = await pool.query(`DELETE FROM Bairro_Atendido_Fornecedor WHERE id_fornecedor=$1 AND id_bairro = $2 RETURNING *`, [id_fornecedor, id_bairro]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Área não encontrada para este fornecedor",
        bairroFornecedor: null
      });
    }

    return res.status(200).json({
      message: `Área removida com sucesso!`,
      bairroFornecedor: result.rows[0]
    });

  } catch (error) {
    console.error(`Erro ao excluir área do fornecedor ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao excluir área",
      BairroFornecedor: null
    });
  }
}
