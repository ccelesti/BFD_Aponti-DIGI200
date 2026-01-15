import { Request, Response } from "express";
import { pool } from "../database/db";

// Health check da API
// GET /healthcheck
export const healthCheck = (_req: Request, res: Response) => {
  res.status(200).json({
    message: "ok",
  });
};

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


