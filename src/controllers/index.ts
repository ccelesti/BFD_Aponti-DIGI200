import { Request, Response } from "express";
import { pool } from "../database/db";

// Health check da API
// GET /healthcheck
export const healthCheck = (_req: Request, res: Response) => {
  res.status(200).json({
    message: "ok",
  });
};

// Lista todos os clientes do banco
// GET /clientes
export async function listarClientes(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM cliente");
    return res.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    return res.status(500).json({ message: "Erro ao buscar clientes" });
  }
}
