import { Request, Response } from "express";
import { pool } from "../database/db";
import { Fornecedor } from "../models";

/**
 * Cadastro de um novo fornecedor.
 * @route POST /fornecedores
 */
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

    const sql = 'INSERT INTO fornecedor (nome_fantasia, razao_social, email, telefone_principal, telefone_alternativo, permissao_contato_cliente, cnpj, senha_hash, status_fornecedor) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;';

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

/**
 * Exibe todos os fornecedores cadastrados.
 * @route GET /fornecedores
 */
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

/**
 * Exibe detalhes de um fornecedor específico.
 * @route GET /fornecedores/:id
 * @param {string} req.params.id - ID do fornecedor.
 */
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

/**
 * Atualiza os dados de um fornecedor específico.
 * @route PUT /fornecedores/:id
 */
export async function editarFornecedor(req: Request, res: Response) {
  try {
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

/**
 * Desativa um fornecedor específico.
 * @route DELETE /fornecedores/:id
 * @param {string} req.params.id - ID do fornecedor a ser desativado.
 */
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

/**
 * Atualiza a permissão de privacidade do fornecedor para receber contato de clientes.
 * @route PUT /fornecedores/:id/privacidade
 * @param {string} req.params.id - ID do fornecedor.
 * @param {boolean} req.body.permissao_contato_cliente - permissão do fornecedor para compartilhar informações com clientes.
 */
export async function privacidadeFornecedor(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { permissao_contato_cliente } = req.body;

    const result = await pool.query(`UPDATE fornecedor SET permissao_contato_cliente = $1 WHERE id_fornecedor = $2 RETURNING *;`, [permissao_contato_cliente, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Fornecedor não encontrado",
        fornecedor: null
      });
    }

    return res.status(200).json({
      message: `Configuração de privacidade do fornecedor ${result.rows[0].nome_fantasia} atualizada com sucesso!`,
      fornecedor: result.rows[0]
    });

  } catch (error) {
    console.error(`Erro ao atualizar privacidade do fornecedor ${req.params.id}:`, error);
 
    return res.status(500).json({
      message: "Erro ao atualizar privacidade do fornecedor",
      fornecedor: null
    });
  }
}


/**
 * Adiciona horário(s) de funcionamento de um fornecedor específico por dia da semana.
 * Cada fornecedor pode cadastrar um horário de abertura e fechamento para cada dia da semana (1 = Segunda, 7 = Domingo).
 *
 * @route POST /fornecedores/:id/horarios
 * @param {string} req.params.id - ID do fornecedor.
 * @param {Array<Object>} req.body - Lista de horários de funcionamento do fornecedor.
 * @param {number} req.body[].dia_funcionamento - Dia da semana (1 a 7).
 * @param {time} req.body[].horario_inicio - Horário de início (formato HH:mm).
 * @param {time} req.body[].horario_termino - Horário de término (formato HH:mm).
 */
export async function adicionarHorarioFuncionamento(req: Request, res: Response) {
  try {
    const id_fornecedor = Number(req.params.id);

    const horarios: { dia_funcionamento: number, horario_inicio: string, horario_termino: string }[] = req.body;

    if (!Array.isArray(horarios) || horarios.length === 0) {
      return res.status(400).json({
        message: "Informe um horário de funcionamento."
      });
    }

    const horariosAdicionados = [];

    for (const horario of horarios) {
      const { dia_funcionamento, horario_inicio, horario_termino } = horario;

      if (!dia_funcionamento || !horario_inicio || !horario_termino) {
        return res.status(400).json({
          message: "Os campos dia da semana (1-7), horário de início e horário de término são obrigatórios!"
        });
      }

      const horárioExistente = await pool.query(
        `SELECT 1 FROM Horario_Funcionamento WHERE id_fornecedor = $1 AND dia_funcionamento = $2`,
        [id_fornecedor, dia_funcionamento]
      );

      if (horárioExistente.rowCount && horárioExistente.rowCount > 0) {
        return res.status(409).json({
          message: `Este fornecedor já possui horário cadastrado para o dia ${dia_funcionamento}`
        });
      }

      const sql = 'INSERT INTO Horario_Funcionamento (id_fornecedor, dia_funcionamento, horario_inicio, horario_termino) VALUES ($1, $2, $3, $4) RETURNING *;';

      const values = [id_fornecedor, dia_funcionamento, horario_inicio, horario_termino];

      const result = await pool.query(sql, values);

      horariosAdicionados.push(result.rows[0]);
    }

    return res.status(201).json({
      message: "Horário(s) de atendimento cadastrado(s) com sucesso!",
      fornecedor: id_fornecedor,
      horariosAtendimento: horariosAdicionados
    });
  } catch (error) {
    console.error("Erro ao cadastrar Horário de atendimento: ", error);

    return res.status(500).json({
      message: "Erro ao cadastrar Horário de atendimento",
      horarioAtendimento: null
    });
  }
}

/**
 * Atualiza os horários de funcionamento de um fornecedor específico por dia da semana.
 * Para cada dia informado:
 * - Verifica se já existe horário cadastrado
 * - Se o horário for igual ao existente, retorna erro
 * - Se o horário for diferente, atualiza o registro
 *
 * @route PUT /fornecedores/:id/horarios
 * @param {string} req.params.id - ID do fornecedor.
 * @param {Array<Object>} req.body - Lista de horários de funcionamento.
 * @param {number} req.body[].dia_funcionamento - Dia da semana (0 = domingo, 6 = sábado).
 * @param {string} req.body[].horario_inicio - Horário de abertura (HH:mm).
 * @param {string} req.body[].horario_termino - Horário de fechamento (HH:mm).
 */
export async function alterarHorarioFuncionamento(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const horarios: { dia_funcionamento: number, horario_inicio: string, horario_termino: string }[] = req.body;

    if (!Array.isArray(horarios) || horarios.length === 0) {
      return res.status(400).json({
        message: "Informe ao menos um horário de funcionamento"
      });
    }

    const horariosAtualizados: any[] = [];

    for (const horario of horarios) {
      const { dia_funcionamento, horario_inicio, horario_termino } = horario;

      const horárioExistente = await pool.query (`SELECT * FROM Horario_Funcionamento WHERE id_fornecedor = $1 AND dia_funcionamento = $2 AND horario_inicio = $3::time AND horario_termino = $4::time`, [id, dia_funcionamento, horario_inicio, horario_termino]);

      if (horárioExistente.rowCount && horárioExistente.rowCount > 0) {
        const novoHorario = horárioExistente.rows[0];

        if (novoHorario.horario_inicio !== horario_inicio || novoHorario.horario_termino !== horario_termino) {
          const result = await pool.query(`UPDATE Horario_Funcionamento SET  horario_inicio = $1, horario_termino = $2 WHERE id_fornecedor = $3 AND dia_funcionamento = $4 RETURNING *;`, [horario_inicio, horario_termino, id, dia_funcionamento]);

          horariosAtualizados.push(result.rows[0]);
        } else {
          return res.status(400).json({
            message: `O horário informado para o dia ${dia_funcionamento} deve ser diferente do que já está cadastrado.`
          });
        }
      }
    }

    return res.status(200).json({
      message: `Horário(s) de funcionamento do fornecedor ${req.params.id} atualizado(s) com sucesso!`,
      horarioFuncionamento: horariosAtualizados
    });
  } catch (error) {
    console.error(`Erro ao atualizar horário de funcionamento do fornecedor ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao atualizar horário de funcionamento de fornecedor",
    });
  }
}

/**
 * Lista os horários de funcionamento de um fornecedor específico.
 * @route GET /fornecedores/:id/horarios
 * @param {string} req.params.id - ID do fornecedor.
 */
export async function listarHorariosFuncionamento(req: Request, res: Response) {
  try {
    const id_fornecedor = Number(req.params.id);

    const result = await pool.query(`SELECT dia_funcionamento, horario_inicio, horario_termino FROM Horario_Funcionamento WHERE id_fornecedor = $1 ORDER BY dia_funcionamento`, [id_fornecedor]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Não existem horários de funcionamento cadastrados para este fornecedor."
      });
    }

    return res.status(200).json({
      message: "Horários de funcionamento encontrados com sucesso!",
      fornecedor: id_fornecedor,
      horariosAtendimento: result.rows
    });
  } catch (error) {
    console.error("Erro ao listar horários de funcionamento: ", error);

    return res.status(500).json({
      message: "Erro ao buscar horários de funcionamento"
    });
  }
}

/**
 * Remove o horário de funcionamento de um fornecedor de um dia específico.
 * @route DELETE /fornecedores/:id/horarios/:dia
 * @param {string} req.params.id - ID do fornecedor.
 * @param {string} req.params.dia - Dia da semana (1 a 7).
 */
export async function removerHorarioFuncionamento(req: Request, res: Response) {
  try {
    const id_fornecedor = Number(req.params.id);
    const dia_funcionamento = Number(req.params.dia);

    const result = await pool.query(`DELETE FROM Horario_Funcionamento WHERE id_fornecedor = $1 AND dia_funcionamento = $2 RETURNING *;`, [id_fornecedor, dia_funcionamento]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Horário não encontrado para exclusão."
      });
    }

    return res.status(200).json({
      message: "Horário de funcionamento removido com sucesso!",
      horarioRemovido: result.rows[0]
    });

  } catch (error) {
    console.error("Erro ao remover horário de funcionamento: ", error);

    return res.status(500).json({
      message: "Erro ao remover horário de funcionamento"
    });
  }
}

/**
 * Lista os clientes que possuem vínculo ativo com o fornecedor.
 * - O vínculo entre cliente e fornecedor deve estar ativo
 * - O cliente deve autorizar o compartilhamento de dados de contato
 * - O fornecedor deve autorizar o recebimento de dados de clientes
 * @route GET /fornecedores/:id/clientes
 * @param {string} req.params.id - ID do fornecedor.
 */
export async function listarClientesVinculadosFornecedor(req: Request, res: Response) {
  try {
    const id_fornecedor = Number(req.params.id);

    const result = await pool.query (`SELECT c.id_cliente, CONCAT(c.nome, ' ', c.sobrenome) AS cliente_nome_completo, c.telefone_principal, c.email FROM cliente_fornecedor cf JOIN cliente c ON c.id_cliente = cf.id_cliente JOIN fornecedor f ON f.id_fornecedor = cf.id_fornecedor WHERE cf.id_fornecedor = $1 AND cf.status_vinculo = true  AND c.permissao_contato_fornecedor = true AND f.permissao_contato_cliente = true;`, [id_fornecedor]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Nenhum cliente com vínculo ativo encontrado para este fornecedor.",
        clientes: []
      });
    }

    return res.status(200).json({
      message: "Clientes vinculados encontrados com sucesso!",
      clientes: result.rows
    });

  } catch (error) {
    console.error("Erro ao listar clientes vinculados ao fornecedor: ", error);

    return res.status(500).json({
      message: "Erro ao listar clientes vinculados ao fornecedor",
      clientes: null
    });
  }
}