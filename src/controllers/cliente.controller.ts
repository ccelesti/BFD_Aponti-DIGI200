import { Request, Response } from "express";
import { pool } from "../database/db";
import { Cliente } from "../models";

/**
 * Cadastro de novo cliente.
 * @route POST /clientes
 */
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

/**
 * Exibe todos os clientes, ativos e inativos.
 * @route GET /clientes
 */
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

/**
 * Exibe detalhes de um cliente específico.
 * @route GET /clientes/:id
 * @param {string} req.params.id - ID do cliente para consulta.
 */
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

/**
 * Atualiza os dados cadastrais de um cliente específico.
 * @route PUT /clientes/:id
 * @param {string} req.params.id - ID do cliente.
 */
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

/**
 * Desativa um cliente específico.
 * @route DELETE /clientes/:id
 * @param {string} req.params.id - ID do cliente a ser desativado.
 */
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

/**
 * Atualiza a permissão de privacidade do cliente para receber contato de fornecedores.
 * @route PUT /clientes/:id/privacidade
 * @param {string} req.params.id - ID do cliente.
 * @param {boolean} req.body.permissao_contato_fornecedor - permissão do cliente para compartilhar informações com fornecedores.
 */
export async function privacidadeCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { permissao_contato_fornecedor } = req.body;

    const result = await pool.query(`UPDATE cliente SET permissao_contato_fornecedor = $1 WHERE id_cliente = $2 RETURNING *;`, [permissao_contato_fornecedor, id]);

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

/**
 * Atualiza o status de autodeclaração do cliente em possuir benefício de Vale Gás.
 * @route PUT /clientes/:id/vale-gas
 * @param {string} req.params.id - ID do cliente.
 * @param {boolean} req.body.vale_gas_ativo
 */
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

/**
 * Cadastra o endereço de um cliente específico.
 * @route POST /clientes/:id/enderecos
 */
export async function adicionarEnderecoCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const {cep, endereco_logradouro, numero = "S/N", complemento = null, id_bairro, nome_endereco = "Casa", endereco_principal = false
    } = req.body;

    const endereco = await pool.query(`INSERT INTO endereco (cep, endereco_logradouro, numero, complemento, id_bairro) VALUES ($1,$2,$3,$4,$5)  RETURNING id_endereco`, [cep, endereco_logradouro, numero, complemento, id_bairro]
    );

    const id_endereco = endereco.rows[0].id_endereco;

    const result = await pool.query(
      `INSERT INTO endereco_cliente (id_cliente, id_endereco, nome_endereco, endereco_principal) VALUES ($1,$2,$3,$4) RETURNING *`, [id, id_endereco, nome_endereco, endereco_principal]
    );

    return res.status(201).json({
      message: "Endereço vinculado ao cliente com sucesso!",
      endereco_cliente: result.rows[0]
    });

  } catch (error) {
    console.error("Erro ao cadastrar endereço do cliente:", error);

    return res.status(500).json({
      message: "Erro ao cadastrar endereço do cliente",
      endereco_cliente: null
    });
  }
}

/**
 * Exibe todos os endereços vinculados a um cliente específico.
 * @route GET /clientes/:id/enderecos
 * @param {string} req.params.id - ID do cliente.
 */
export async function visualizarEnderecoCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const result = await pool.query("SELECT * FROM vw_Cliente_Endereco WHERE id_cliente = $1", [id]);

    if (result.rows.length === 0) {
      
      return res.status(200).json({
        message: "Nenhum endereço encontrado para este cliente",
        enderecos: []
      });
    }

      return res.status(200).json({
        message: `Endereços do cliente listados com sucesso`,
        enderecos: result.rows
      })
    
  } catch (error) {
    console.error(`Erro ao buscar endereços do cliente ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao buscar endereços do cliente",
      enderecos: null
    });
  }
}

/**
 * Exibe apenas os endereços ativos de um cliente específico.
 * @route GET /clientes/:id/enderecos-ativos
 * @param {string} req.params.id - ID do cliente.
 */
export async function visualizarEnderecosAtivosCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const result = await pool.query("SELECT * FROM vw_Cliente_Endereco WHERE id_cliente = $1 AND endereco_ativo = true", [id]);

    if (result.rows.length === 0) {
      return res.status(200).json({
        message: "Nenhum endereço ativo encontrado para este cliente",
        enderecos: []
      });
    }

    return res.status(200).json({
      message: `Endereços ativos listados com sucesso!`,
      enderecos: result.rows
    });

  } catch (error) {
    console.error(`Erro ao exibir endereços ativos do cliente ${req.params.id}: `, error);

    return res.status(500).json({
      message: "Erro ao buscar endereços do cliente",
      enderecos: null
    });
  }
}

/**
 * Atualiza os dados de endereço existente de um cliente específico.
 * @route PUT /clientes/:id/enderecos/:id_endereco
 * @param {string} req.params.id - ID do cliente.
 * @param {string} req.params.id_endereco - ID do endereço.
 */
export async function editarEnderecoCliente(req: Request, res: Response) {
  try {
    const id_cliente = Number(req.params.id);
    const id_endereco = Number(req.params.id_endereco);

    const {cep, endereco_logradouro, numero = "S/N", complemento = null, id_bairro, nome_endereco = "Casa", endereco_principal = false
    } = req.body;

    const verificaEndereco = await pool.query(`SELECT 1 FROM endereco_cliente WHERE id_cliente = $1 AND id_endereco = $2`, [id_cliente, id_endereco]
    );

    if(verificaEndereco.rows.length === 0) {
      return res.status(404).json({
        message: "Endereço não encontrado para este cliente",
        endereco_cliente: null
      })
    }

    const result = await pool.query(`UPDATE endereco SET cep = $1, endereco_logradouro = $2, numero = $3, complemento = $4, id_bairro = $5 WHERE id_endereco=$6 RETURNING *`, [cep, endereco_logradouro, numero, complemento, id_bairro, id_endereco]
    );

    await pool.query(`UPDATE endereco_cliente SET nome_endereco = $1, endereco_principal = $2, atualizado_em = NOW() WHERE id_endereco=$3`, [nome_endereco, endereco_principal, id_endereco]
    );

    return res.status(201).json({
      message: "Endereço do cliente alterado com sucesso!",
      endereco_cliente: result.rows[0]
    });

  } catch (error) {
    console.error(`Erro ao editar endereço ${req.params.id_endereco} do cliente: `, error);

    return res.status(500).json({
      message: "Erro ao editar endereço do cliente",
      endereco_cliente: null
    });
  }
}

/**
 * Desativa um endereço de um cliente específico.
 * @route DELETE /clientes/:id/enderecos/:id_endereco
 * @param {string} req.params.id - ID do cliente.
 * @param {string} req.params.id_endereco - ID do endereço a ser desativado.
 */
export async function excluirEnderecoCliente(req: Request, res: Response) {
  try {
    const id_cliente = Number(req.params.id);
    const id_endereco = Number(req.params.id_endereco);

    const result = await pool.query(`UPDATE endereco_cliente SET endereco_ativo = false WHERE id_cliente=$1 AND id_endereco=$2 RETURNING *;`, [id_cliente, id_endereco]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Endereço não encontrado para este cliente.",
        endereco_cliente: null
      });
    }

    return res.status(200).json({
      message: `Endereço excluído com sucesso!`,
      endereco_cliente: result.rows[0]
    });

  } catch (error) {
    console.error(`Erro ao excluir endereço: `, error);

    return res.status(500).json({
      message: "Erro ao excluir endereço de cliente",
      endereco_cliente: null
    });
  }
}

/**
 * Exibe todos os fornecedores que realizam a entrega no endereço principal de um cliente específico.
 * @route GET /clientes/:id/fornecedores-recomendados
 * @param {string} req.params.id_cliente - ID do cliente.
 */
export async function listarFornecedoresRecomendados(req: Request, res: Response) {
  try {
    const id_cliente = Number(req.params.id);

    const result = await pool.query(`SELECT DISTINCT f.id_fornecedor, f.nome_fantasia, b.nome_bairro FROM endereco_cliente ec JOIN endereco e ON e.id_endereco = ec.id_endereco JOIN bairro b ON b.id_bairro = e.id_bairro JOIN bairro_atendido_fornecedor baf ON baf.id_bairro = b.id_bairro JOIN fornecedor f ON f.id_fornecedor = baf.id_fornecedor WHERE ec.id_cliente = $1 AND ec.endereco_principal = true;`, [id_cliente]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Nenhum fornecedor atende o bairro do endereço principal deste cliente.",
        fornecedores: null
      });
    }

    return res.status(200).json({
      message: "Fornecedores recomendados encontrados com sucesso.",
      fornecedores: result.rows
    });

  } catch (error) {
    console.error("Erro ao buscar fornecedores recomendados:", error);

    return res.status(500).json({
      message: "Erro ao buscar fornecedores recomendados.",
      fornecedores: null
    });
  }
}

/**
 * Permite que um cliente visualize os horários de funcionamento de um fornecedor específico (com vínculo ativo).
 * @route GET /clientes/:id_cliente/fornecedores/:id_fornecedor/horarios
 * @param {string} req.params.id - ID do cliente.
 * @param {string} req.params.id_fornecedor - ID do fornecedor.
 */
export async function visualizarHorarioFuncionamentoFornecedor(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const id_fornecedor = Number(req.params.id_fornecedor);

    const vinculo = await pool.query(`SELECT 1 FROM cliente_fornecedor WHERE id_cliente = $1 AND id_fornecedor = $2 AND status_vinculo = true`, [id, id_fornecedor]
    );

    if (vinculo.rowCount === 0) {
      return res.status(403).json({
        message: "Acesso negado. O cliente não possui vínculo ativo com este fornecedor."
      });
    }

    const horarios = await pool.query(`SELECT dia_funcionamento, horario_inicio, horario_termino, esta_aberto FROM horario_funcionamento WHERE id_fornecedor = $1 ORDER BY dia_funcionamento`,
      [id_fornecedor]
    );

    if (horarios.rowCount === 0) {
      return res.status(404).json({
        message: "Nenhum horário de funcionamento cadastrado para este fornecedor.",
        horarios: []
      });
    }

    return res.status(200).json({
      message: "Horários de funcionamento do fornecedor encontrados com sucesso!",
      fornecedor: id_fornecedor,
      horarios: horarios.rows
    });

  } catch (error) {
    console.error("Erro ao visualizar horário de funcionamento: ", error);

    return res.status(500).json({
      message: "Erro ao consultar horário de funcionamento do fornecedor",
      horarios: null
    });
  }
}
