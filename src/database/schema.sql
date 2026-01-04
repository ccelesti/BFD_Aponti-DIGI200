-- ===========================================================================
-- ====================   SCHEMA DO BANCO (PostgreSQL)    ====================
-- ===========================================================================
--
-- Este arquivo deve refletir o ESTADO ATUAL do banco de dados.
--
-- ⚠️ Importante:
-- - Apenas o responsável pelo schema deve alterar a estrutura
-- - Se houver mudanças no banco, o schema.sql deve ser atualizado
--
-- Fluxo de trabalho:
-- 1) Realize a alteração primeiro no banco
-- 2) Valide dependências (FK/PK, constraints, índices) e ajuste se necessário
-- 3) Atualize este arquivo para manter o schema sincronizado
--
-- Observações:
-- - O banco e este arquivo NUNCA devem divergir
-- - O contexto das mudanças deve estar nos commits
-- ===========================================================================


-- ===========================================================================
-- ====================             CLIENTES              ====================
-- ===========================================================================

CREATE TABLE Cliente (
  id_cliente SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  sobrenome VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefone_principal CHAR(11) NOT NULL UNIQUE,
  telefone_alternativo CHAR(11),
  permissao_contato_fornecedor BOOLEAN DEFAULT FALSE,
  cpf CHAR(11) NOT NULL UNIQUE,
  vale_gas_ativo BOOLEAN DEFAULT FALSE,
  senha_hash TEXT NOT NULL,
  data_nascimento DATE NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW(),
  status_cliente BOOLEAN DEFAULT TRUE
);

-- ===========================================================================
-- ====================           FORNECEDORES            ====================
-- ===========================================================================

CREATE TABLE Fornecedor (
  id_fornecedor SERIAL PRIMARY KEY,
  nome_fantasia VARCHAR(40) NOT NULL,
  razao_social VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefone_principal CHAR(11) NOT NULL UNIQUE,
  telefone_alternativo CHAR(11),
  permissao_contato_cliente BOOLEAN DEFAULT FALSE,
  cnpj CHAR(14) NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW(),
  status_fornecedor BOOLEAN DEFAULT TRUE
);

-- ===========================================================================
-- ====================             BAIRROS               ====================
-- ===========================================================================

CREATE TABLE Bairro (
  id_bairro SERIAL PRIMARY KEY,
  nome_bairro TEXT NOT NULL,
  municipio TEXT NOT NULL,
  estado CHAR(2) NOT NULL CHECK (estado IN (
            'AC','AL','AP','AM','BA','CE','DF','ES',
            'GO','MA','MT','MS','MG','PA','PB','PR',
            'PE','PI','RJ','RN','RS','RO','RR','SC',
            'SP','SE','TO'      
)),
  CONSTRAINT bairro_municipio_unico UNIQUE (nome_bairro, municipio)
);

-- ===========================================================================
-- ====================            ENDEREÇOS              ====================
-- ===========================================================================

CREATE TABLE Endereco (
  id_endereco SERIAL PRIMARY KEY,
  cep CHAR(8) NOT NULL,
  endereco_logradouro TEXT NOT NULL,
  numero TEXT DEFAULT 'S/N',
  complemento TEXT,
  id_bairro INT NOT NULL REFERENCES Bairro(id_bairro)
);

-- ===========================================================================
-- ====================    HORÁRIOS DE FUNCIONAMENTO      ====================
-- ===========================================================================

CREATE TABLE Horario_Funcionamento (
  id_funcionamento SERIAL PRIMARY KEY,
  dia_funcionamento SMALLINT NOT NULL CHECK (dia_funcionamento BETWEEN 1 AND 7),
  horario_inicio TIME,
  horario_termino TIME,
  esta_aberto BOOLEAN DEFAULT TRUE,
  id_fornecedor INT NOT NULL REFERENCES Fornecedor(id_fornecedor) ON DELETE CASCADE,
  UNIQUE (id_fornecedor, dia_funcionamento)
);

-- ===========================================================================
-- ====================       ENDEREÇOS DO CLIENTE        ====================
-- ===========================================================================

CREATE TABLE Endereco_Cliente (
  id_endereco_cliente SERIAL PRIMARY KEY,
  id_cliente INT NOT NULL REFERENCES Cliente(id_cliente) ON DELETE CASCADE,
  id_endereco INT NOT NULL REFERENCES Endereco(id_endereco) ON DELETE CASCADE,
  nome_endereco TEXT DEFAULT 'Casa',
  endereco_principal BOOLEAN DEFAULT FALSE,
  endereco_ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================================================
-- ====================       CLIENTE x FORNECEDOR        ====================
-- ===========================================================================

CREATE TABLE Cliente_Fornecedor (
  id_cliente INT REFERENCES Cliente(id_cliente) ON DELETE CASCADE,
  id_fornecedor INT REFERENCES Fornecedor(id_fornecedor) ON DELETE CASCADE,
  PRIMARY KEY (id_cliente, id_fornecedor),
  status_vinculo BOOLEAN DEFAULT FALSE
);

-- ===========================================================================
-- ==================== BAIRROS ATENDIDOS PELO FORNECEDOR ====================
-- ===========================================================================

CREATE TABLE Bairro_Atendido_Fornecedor (
  id_fornecedor INT NOT NULL REFERENCES Fornecedor(id_fornecedor) ON DELETE CASCADE,
  id_bairro INT NOT NULL REFERENCES Bairro(id_bairro) ON DELETE CASCADE,
  PRIMARY KEY (id_fornecedor, id_bairro)
);

-- ===========================================================================
-- ====================         VIEWS (SEGURANÇA)         ====================
-- ===========================================================================
-- ===========================================================================
-- ====================   VIEW CLIENTES (SEM SENHA_HASH)  ====================
-- ===========================================================================

CREATE OR REPLACE VIEW vw_Cliente AS
SELECT 
    id_cliente,
    nome,
    sobrenome,
    email,
    telefone_principal,
    telefone_alternativo,
    permissao_contato_fornecedor,
    cpf,
    vale_gas_ativo,
    data_nascimento,
    criado_em,
    atualizado_em,
    status_cliente
FROM Cliente;

-- ===========================================================================
-- ==================== VIEW FORNECEDORES (SEM SENHA_HASH)====================
-- ===========================================================================

CREATE OR REPLACE VIEW vw_Fornecedor AS
SELECT 
    id_fornecedor,
    nome_fantasia,
    razao_social,
    email,
    telefone_principal,
    telefone_alternativo,
    permissao_contato_cliente,
    cnpj,
    criado_em,
    atualizado_em,
    status_fornecedor
FROM Fornecedor;

-- ===========================================================================
-- ===================== VIEW ENDEREÇO CLIENTE  ==============================
-- ===========================================================================

CREATE OR REPLACE VIEW vw_Cliente_Endereco AS
SELECT
  c.id_cliente,
  c.nome,
  c.sobrenome,
  e.cep,
  e.endereco_logradouro,
  e.numero,
  e.complemento,
  b.nome_bairro,
  b.municipio,
  b.estado,
  ec.nome_endereco,
  ec.endereco_principal,
  ec.endereco_ativo
FROM cliente AS c
JOIN endereco_cliente AS ec
  ON ec.id_cliente = c.id_cliente
JOIN endereco AS e
  ON e.id_endereco = ec.id_endereco
LEFT JOIN bairro AS b
  ON b.id_bairro = e.id_bairro;