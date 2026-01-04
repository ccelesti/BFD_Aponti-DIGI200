import { Request, Response } from "express";
import { pool } from "../database/db";
import { BairroAtendidoFornecedor} from "../models";

// Cadastro de fornecedor
// POST /fornecedores/adicionar-area
export async function adicionarBairroAtendido(req: Request, res: Response) {
    try {
    const { 
        id_fornecedor, id_bairro 
    }: BairroAtendidoFornecedor = req.body;        
    const sql = 'INSERT INTO Bairro_Atendido_Fornecedor(id_fornecedor, id_bairro) VALUES ($1, $2) RETURNING *;';
      
    const values = [id_fornecedor,id_bairro];
      
    const result = await pool.query(sql, values);
      
    return res.status(201).json({
        message: `Bairro ${result.rows[0].nome_fantasia} cadastrado com sucesso!`,
        BairroAtendido: result.rows
    });

    } catch (error) {
      console.error("Erro ao cadastrar Área: ", error);
      
      return res.status(500).json({
        message: "Erro ao cadastrar Área",
        bairroAtendido: null
      });
    }
  }
  
// Exibe todos os bairros atendidos de um fornecedor
// GET /fornecedores/areas
export async function listarBairrosAtendidos(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM vw_Bairro_Atendidos_Fornecedor");
    return res.status(200).json({
      message: `Foram encontrados ${result.rows.length} Bairros Fornecidos.`,
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

// Exibe bairro atendido pelo fornecedor por ID
// GET /fornecedores/:id/area-atendida
export async function listarBairroAtendido(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await pool.query(`SELECT * FROM vw_Bairro_Atendido_Fornecedor WHERE id_fornecedor = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Fornecedor não encontrado",
        bairroFornecedor: null
      });
    }

    return res.status(200).json({
      message: `Fornecedor ${result.rows[0].nome_fantasia} encontrado com sucesso!`,
      bairroFornecedor: result.rows
    });

  } catch (error) {
    console.error(`Erro ao exibir fornecedor ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao buscar fornecedor",
      fornecedor: null
    });
  }
}

// Atualiza bairro atendido pelo fornecedor por ID
// PUT /fornecedores/:id/editar-areas
export async function editarBairroFornecido(req: Request, res: Response) {
  try{
    const id = Number(req.params.id);
    
    const { 
        id_fornecedor, id_bairro 
    }: BairroAtendidoFornecedor = req.body;        
    const sql = 'UPDATE Bairro_Atendido_Fornecedor SET id_fornecedor = $1, id_bairro = $2';
      
    const values = [id_fornecedor,id_bairro];
      
        const result = await pool.query(sql, values);
        
        if (result.rows.length === 0) {
          return res.status(404).json({
            message: "Nenhuma área de atendimento cadastrada",
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


// Deleta um bairro atendido
// DELETE /fornecedores/:id/delete-area
export async function excluirBairroAtendido(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const {idFornecedor, idBairro} = req.body;
    const result = await pool.query(`DELETE FROM Bairro_Atendido_Fornecedor WHERE id_fornecedor=$1 AND id_bairro = $2`, [idFornecedor, idBairro]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "área não encontrada",
        bairroFornecedor: null
      });
    }

    return res.status(200).json({
      message: `área ${result.rows[0].nome_fantasia} excluída com sucesso!`,
      bairroFornecedor: result.rows[0]
    });

  } catch (error) {
    console.error(`Erro ao excluir área ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao excluir área",
      BairroFornecedor: null
    });
  }
}
