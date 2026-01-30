<div style="text-align: center;">
  <img src="./src/assets/Logo/BotijON.png" alt="BotijON Logo" width="500">
</div>

# BotijON • Sistema de Gerenciamento e Alerta de Gás
### Bolsa Futuro Digital (Aponti) — Equipe DIGI-200

<br>

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)   [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)   [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)   [![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)   [![License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE) 

[![Postman Documentation](https://img.shields.io/badge/Postman-Documentation-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/51751781/2sBXVkCA7p)

## 📝 Descrição Geral
O **BotijON** faz parte do _Projeto Integrador_, desenvolvido no contexto do programa **[*Bolsa Futuro Digital*](https://aponti.org.br/capital-humano#programa-bfd)**, promovido pela **[*Aponti - Pernambuco*](https://aponti.org.br/)**, como atividade de culminância da formação, pela equipe **DIGI-200**, da _Turma 33 PE C1 - Back-end Node.js_.

O sistema funciona como uma **API backend**, responsável por simular o monitoramento do consumo de gás de cozinha em uma residência, e atuando como **ponte de comunicação** entre **clientes** e **fornecedores**, com foco em:
- organização da arquitetura backend;
- aplicação de boas práticas de desenvolvimento;
- persistência de dados em banco relacional;
- simulação de integração com sensores IoT.

---

## Índice
- [Descrição Geral](#-descrição-geral)
- [Visão Geral do Sistema](#-visão-geral)
- [Objetivo do Projeto](#-objetivo-do-projeto)
- [Contexto do MVP](#-contexto-do-mvp)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Equipe e Contribuições](#equipe-e-contribuições)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Principais Rotas da API](#-principais-rotas-da-api)
- [Testes das Rotas](#-testes-das-rotas)
- [Status do Projeto](#-status-do-projeto)
- [Próximos Passos (Evoluções Futuras)](#-próximos-passos-evoluções-futuras)
- [Licença](#-licença)
- [Programa, Apoio e Formação](#-programa-apoio-e-formação)

---

## 🔎 Visão Geral do Sistema
O **Gás Digi-200** é um sistema backend que:
- Centraliza informações de **clientes** e **fornecedores de gás**;
- Simula a leitura do **nível de gás** por meio de um sensor virtual;
- Permite que clientes _autorizem ou não_ o compartilhamento de dados com fornecedores;
- Organiza **endereços** e **áreas atendidas**;
- Facilita a **comunicação** entre as partes, sem intermediar pagamento ou venda.

---

## 🎯 Objetivo do Projeto
Desenvolver uma API backend **funcional** e **estruturada**, capaz de simular um cenário real de monitoramento de gás de cozinha, servindo como base para:
- futuras integrações com **sensores físicos** (IoT real);
- integração com **frontend web ou mobile**;
- expansão para notificações, automações e novos serviços.

O projeto resulta tanto da aplicação dos conhecimentos adquiridos ao longo do programa quanto do esforço de pesquisa, estudo e aprofundamento extraclasse realizado pelos responsáveis pelo desenvolvimento, envolvendo **análise de problemas reais**, **elicitação** e **organização de requisitos** e **avaliação de soluções tecnológicas adequadas**.

Nesse contexto, foram aplicados conhecimentos relacionados a:
- lógica de programação e modelagem de soluções;
- princípios de _engenharia de software_;
- construção de **APIs RESTful** alinhadas aos requisitos funcionais e não funcionais;
- uso de **TypeScript** para tipagem estática e maior robustez do código;
- integração com **PostgreSQL**;
- organização do código em camadas (rotas, controllers e acesso a dados);
- aplicação de boas práticas de versionamento, documentação técnica e manutenção de software.

---

## 🧩 Contexto do MVP
- Monitoramento do nível de gás realizado por **sensor simulado**;
- Sensor físico real previsto para **implementações futuras**;
- Backend centraliza a lógica de negócio e comunicação;
- Integrações futuras (frontend, IoT real, notificações) planejadas.

---

## Funcionalidades
- Cadastro e gerenciamento de **clientes**;
- Cadastro e gerenciamento de **fornecedores**;
- Gestão de **endereços** e **áreas de atendimento**;
- Simulação do **nível de gás** por sensor virtual;
- Controle de **permissão de contato** entre clientes e fornecedores;
- Estrutura preparada para integrações futuras. 

---

## 🛠️ Tecnologias Utilizadas
#### Backend
- **Node.js** – Ambiente de execução do servidor backend.
- **Express** – Framework para construção das APIs RESTful.
- **TypeScript** – Linguagem principal do projeto, garantindo tipagem estática e maior segurança.

#### Banco de Dados
- **PostgreSQL** – Banco de dados relacional, utilizado tanto em ambiente local (Docker) quanto em nuvem (Render).

#### Simulação IoT
- **Node-RED** – Ferramenta utilizada para simular o sensor de gás, gerando dados mockados que representam o funcionamento de um sensor físico real.

#### Infraestrutura
- **Docker** – Conteinerização dos serviços do sistema.
- **Docker Compose** – Orquestração dos containers para ambiente de desenvolvimento.
- **Render** – Hospedagem do banco de dados PostgreSQL em nuvem.

#### Ferramentas de Qualidade e Suporte
- **Thunder Client** – Testes rápidos das rotas da API no VS Code.
- **Postman** – Documentação e validação das rotas.
- **dotenv** – Gerenciamento de variáveis de ambiente.

---
## Equipe e Contribuições: 
### 👩🏽‍💻🧑🏿‍💻 Contribuições dos integrantes no projeto:

| Nome | Contribuição | Roles | Linkedin | Github |
|------|--------------|-------|----------|--------|
| **Camila Moura** | **Gestão do Projeto:** liderança do projeto, condução de reuniões, definição de pautas, revisão e controle de qualidade geral do sistema e da documentação; **Concepção do Produto:** brainstorming, reuniões com stakeholders e sugestões no protótipo (Figma); **Planejamento e Backlog:** organização e priorização do backlog no Trello, padronização de requisitos e revisão das contribuições; **Documentação Técnica:** consolidação da versão inicial, reconstrução da documentação final, redefinição dos requisitos funcionais e ajuste do escopo do MVP, elaboração do README e documentação técnica das rotas e controllers da API no Postman; **Banco de Dados:** modelagem e implementação do schema, definição de tabelas e relacionamentos, criação de scripts SQL, população via pgAdmin/PostgreSQL e via requisições HTTP, integração prática do PostgreSQL com a API; **Arquitetura Backend:** definição e implementação do padrão MVC, escolha das tecnologias, organização da estrutura do projeto e desenvolvimento de controllers e rotas principais da API; **Comunicação e Apresentação:** elaboração e apresentação do pitch, desenvolvimento dos slides, roteiro e gravação do vídeo de demonstração do sistema. | Product Owner, Liderança / Dev & Docs Team | [/camilacelestino](https://www.linkedin.com/in/camilacelestino) | [/ccelesti](https://github.com/ccelesti) |
| **Ruberval Brasileiro** | **Concepção do Produto:** participação em brainstormings e reuniões com stakeholders; **Planejamento e Organização:** apoio nos próximos passos do projeto e atuação informal como vice-líder; **Documentação Técnica:** elaboração da versão inicial da documentação técnica de requisitos, pesquisa da lógica de negócio e apoio à modelagem conceitual; **Protótipo (Figma):** criação de fluxos de telas e ajustes conforme feedback do time; **Desenvolvimento Backend:** desenvolvimento de validações de dados; **Apoio à Equipe:** orientação sobre uso do Trello e Google Docs. | Design & Dev Team | [/ruberval-brasileiro](https://www.linkedin.com/in/ruberval-brasileiro-5996a7324/) | [/rubervalbrasileiro](https://github.com/rubervalbrasileiro) |
| **Cícera Maria** | **Concepção do Produto:** participação em brainstormings e reuniões com stakeholders; **Planejamento e Backlog:** apoio operacional na organização do backlog no Trello a partir dos requisitos definidos pela liderança; **Documentação Técnica:** suporte na atualização da documentação final, com substituição e organização dos requisitos funcionais conforme orientações da liderança. | Docs Team | [/ciceradevback](https://www.linkedin.com/in/ciceradevback) | [/ciceradevback](https://github.com/ciceradevback) |
| **Adriel Gomes** | **Concepção do Produto:** participação em brainstormings, reuniões com stakeholders e sugestões no protótipo (Figma); **Documentação Técnica:** apoio na elaboração do README, com foco em instruções de instalação de dependências, observações relacionadas ao sensor simulado; **Desenvolvimento Backend:** desenvolvimento de funções e lógica relacionadas ao sensor virtual do botijão de gás; **Comunicação e Apresentação:** apoio na gravação e edição do vídeo de demonstração do sistema. | Dev Team | [/adriel-gomes](https://www.linkedin.com/in/adriel-gomes-472974218/) | [/Adriel-grs](https://github.com/Adriel-grs) |
| **João Henrique** | **Concepção do Produto:** participação em brainstormings e reuniões com stakeholders; **Gestão Inicial do Projeto:** atuação como líder no início do projeto, conduzindo reuniões e organizando as primeiras atividades; **Documentação Técnica:** apoio na construção da primeira versão da documentação de requisitos. *(Posteriormente, desligou-se do projeto durante a fase prática.)* | Líder Inicial | [/joao-melo](https://www.linkedin.com/in/joao-melo16/) | [/Dev-JoaoMelo](https://github.com/Dev-JoaoMelo) |

<br>

### 🧑🏻‍💻 Contribuições de Colaboradores Externos no projeto:

| Nome | Contribuição | Roles | Linkedin | Github |
|------|--------------|-------|----------|--------|
| **Gabriel Lucas** | **Documentação do Projeto:** participação ativa na reconstrução dos requisitos, discussões sobre regras de negócio e refinamento da documentação técnica de requisitos, documentação de rotas e controllers no Postman; **Banco de Dados:** suporte à modelagem do banco de dados, sugestões técnicas, apoio na criação e execução de scripts SQL e criação de views para consultas do sistema;  **Versionamento e Execução:** orientações sobre Git/GitHub; **Desenvolvimento Backend:** desenvolvimento de funções e lógica relacionadas ao domínio de Fornecedores. | Backend & Database Support | [/gabriel-lucas](https://www.linkedin.com/in/gabriel-lucas-de-oliveira-xavier-507564358/) | [/Ggeasy1574](https://github.com/Ggeasy1574) |
| **Leonardo Rafael** | **Documentação do Projeto:** suporte técnico na reconstrução e validação dos requisitos e decisões de escopo da documentação técnica de requisitos, incluindo sugestão do uso do Postman para documentação de rotas e controllers; **Arquitetura e Tecnologias:** suporte na decisão de arquitetura MVC, definição de banco de dados, sugestão de hospedagem em ambiente remoto, dependências e ferramentas de desenvolvimento; **Versionamento e Execução:** orientações sobre Git/GitHub e etapas iniciais de execução do projeto; **Comunicação e Apresentação:** apoio na elaboração do README, elaboração do roteiro e dos slides do pitch, além de suporte à evolução da logotipo. | Consultoria Técnica, Documentação & Revisão| [/leonardorafael1604](https://www.linkedin.com/in/leonardorafael1604/) | [/LeonardoRDA1604](https://github.com/LeonardoRDA1604) |
| **Samuel Victor** | **Documentação do Projeto:** apoio na etapa final de revisão e padronização da documentação técnica de requisitos, com melhoria da escrita, verificação de consistência das informações e adequação ao formato final, seguindo orientações da liderança. | Documentação & Revisão | [/samuel-victor](https://www.linkedin.com/in/samuel-victor-3426b3368/) | [/samuel-victorr](https://github.com/SamuelVictorr) |
| **Leandro Wilke** | **Identidade Visual:** melhorias na logotipo do projeto, com ajustes de definição, cores e tipografia, contribuindo para a identidade visual final. | Design Gráfico | [/leandro-wilke](https://www.linkedin.com/in/leandro-wilke/) | [/LeandroWilkeDev](https://github.com/LeandroWilkeDev) |

---

## 🧱 Arquitetura do Projeto

```bash
BFD_APONTI-DIGI200/
├── back-end/
│   ├── node_modules/             # Dependências do projeto
│   │
│   ├── scripts/                  # Scripts de Banco de Dados
│   │   └── schema.sql            # Script DDL de criação das tabelas
│   │
│   ├── src/
│   │   ├── assets/               # Arquivos de Mídia
│   │   │   └── Logo/BotijON.png  # Logotipo do BotijON
│   │   │   
│   │   ├── controllers/          # Lógica das requisições
│   │   │   ├── bairrofornecedor.controller.ts
│   │   │   ├── cliente.controller.ts
│   │   │   ├── fornecedor.controller.ts
│   │   │   ├── sensor.controller.ts
│   │   │   ├── vinculo.controller.ts
│   │   │   └── index.ts          # Exportador dos controladores
│   │   │
│   │   ├── database/             # Conexão com PostgreSQL
│   │   │   └── db.ts             # Configuração do Pool de conexões
│   │   │
│   │   ├── routes/               # Definição das rotas da API
│   │   │   ├── cliente.routes.ts
│   │   │   ├── fornecedor.routes.ts
│   │   │   ├── sensor.routes.ts
│   │   │   ├── vinculo.routes.ts
│   │   │   └── index.ts          # Roteador principal e agrupamento
│   │   │
│   │   ├── services/             # Regras de Negócio e Algoritmos
│   │   │   └── sensor.services.ts # Heurística de cálculo de nível e previsão
│   │   │
│   │   ├── models.ts             # Interfaces e Tipagens TypeScript
│   │   └── app.ts                # Configuração principal da aplicação
│   │
│   ├── Dockerfile                # Imagem Docker do Backend
│   ├── .dockerignore             # Arquivos ignorados pelo Docker
│   ├── package.json              # Dependências e Scripts NPM
│   ├── package-lock.json         # Versionamento exato das dependências
│   └── tsconfig.json             # Configuração do TypeScript
│
├── iot-simulator/                # Simulação IoT (Ambiente Node-RED)
│   └── flows.json                # Fluxos de automação e geração de dados
│
├── .env                          # Variáveis de ambiente
├── .env.example                  # Modelo de variáveis de ambiente
├── docker-compose.yml            # Orquestração dos Containers
├── .gitignore                    # Arquivos ignorados pelo Git
├── LICENSE                       # Licença do projeto
└── README.md                     # Documentação do Projeto
```

## Versão Resumida da Arquitetura

```bash
back-end/src/
├── routes/        → Pontos de entrada. Recebe a requisição HTTP e direciona para o Controller
├── controllers/   → Gerencia a requisição. Valida dados e devolve a resposta (JSON)
├── services/      → Inteligência do sistema. Contém cálculos de previsão e heurísticas
├── database/      → Acesso a dados. Executa as queries SQL diretamente no banco
├── models.ts      → Define interfaces e tipagens esperadas pelo sistema
└── app.ts         → Inicializa a aplicação e registra middlewares e rotas
```

---

### ✅ Pré-requisitos
Para executar o projeto, é necessário ter instalado:
- **Node.js v18 ou superior**
- **Docker e Docker Compose**
- **pgAdmin 4** (opcional, para visualização do banco de dados)

---

## 🚀 Como Executar o Projeto
### 1️⃣ Clonar o repositório

```bash
git clone [https://github.com/ccelesti/BFD_Aponti-DIGI200.git](https://github.com/ccelesti/BFD_Aponti-DIGI200.git)
cd BFD_Aponti-DIGI200
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente
O projeto utiliza dois arquivos de variáveis de ambiente, separados por responsabilidade: um na raiz do projeto (infraestrutura) e outro no backend (API).

> 📁 .env (raiz do projeto)

Responsável pela configuração da infraestrutura Docker e Node-RED.

Crie o arquivo `.env` na raiz do projeto com base em `.env.example`:

```bash
# PostgreSQL (Docker)
POSTGRES_USER=admin
POSTGRES_PASSWORD=123
POSTGRES_DB=bfd_database
POSTGRES_PORT=5432

# API
DATABASE_URL=postgresql://admin:123@postgres:5432/bfd_database
API_PORT=3000

# Node-RED
NODE_RED_PORT=1880
```

> 📁 back-end/.env

Responsável exclusivamente pela API desenvolvida em Node.js/Express. Contém a string de conexão (DATABASE_URL) que permite à aplicação encontrar e se autenticar no banco de dados rodando no Docker.

Crie o arquivo `back-end/.env` com base em `back-end/.env.example`:

```bash
# Servidor (Express)
PORT=3001

# Banco de dados (PostgreSQL)
DATABASE_URL=postgresql://admin:123@localhost:5432/bfd_database
```

### 4️⃣ Executar em modo desenvolvimento

```bash
npm run dev
```

### 5️⃣ Build e execução em produção

```bash
npm run build
npm start
```

### 6️⃣ Execução com Docker Compose (novo e essencial)
Na raiz do projeto, execute o comando:

```bash
docker compose up -d
```

Esse comando irá:
- Subir o backend;
- Inicializar o banco de dados PostgreSQL;
- Disponibilizar o ambiente completo para desenvolvimento.

---

## 🔗 Principais Rotas da API
Nossa API segue o padrão RESTful. Abaixo estão os principais ***endpoints*** disponíveis, organizados por domínio. As rotas podem visualizadas por completo e testadas através da nossa documentação interativa via Postman: 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/51751781/2sBXVkCA7p)

### 👤 Clientes (`/clientes`)
| Método | Endpoint | Descrição |
|---|---|---|
| **POST** | `/clientes` | Cadastra um novo cliente no sistema. |
| **GET** | `/clientes` | Lista todos os clientes cadastrados. |
| **GET** | `/clientes/:id` | Retorna os dados de um cliente específico pelo ID. |
| **PUT** | `/clientes/:id` | Atualiza as informações cadastrais de um cliente. |
| **DELETE** | `/clientes/:id` | Remove um cliente da base de dados. |

### 🚚 Fornecedores (`/fornecedores`)
| Método | Endpoint | Descrição |
|---|---|---|
| **POST** | `/fornecedores` | Cadastra um novo fornecedor de gás. |
| **GET** | `/fornecedores` | Lista todos os fornecedores disponíveis. |
| **GET** | `/fornecedores/:id` | Busca um fornecedor específico pelo ID. |
| **PUT** | `/fornecedores/:id` | Atualiza os dados de um fornecedor. |
| **DELETE** | `/fornecedores/:id` | Remove um fornecedor do sistema. |

### 🤝 Vínculos e Permissões (`/vinculos`)
Gerencia a relação entre clientes e fornecedores (ex: permissão de contato).
| Método | Endpoint | Descrição |
|---|---|---|
| **POST** | `/vinculos` | Cadastra um vínculo/autorização entre cliente e fornecedor. |
| **PUT** | `/vinculos` | Atualiza vínculo entre cliente e fornecedor. |
| **DELETE** | `/vinculos` | Revoga o vínculo entre as partes. |

### 🎛️ Sensor (`/sensor`)
Rotas utilizadas para a simulação de leitura do nível de gás de cozinha.
| Método | Endpoint | Descrição |
|---|---|---|
| **POST** | `/sensores/:id_sensor/leituras` | Recebe os dados simulados do nível de gás (via Node-RED). |
| **GET** | `/clientes/:id_cliente/sensores/:id_sensor/status` | Consulta o nível atual de gás de um cliente. |
---

## 🧪 Testes das Rotas
É possível testar a nossa API utilizando o:
- **Thunder Client** (recomendado para testes rápidos no VS Code)
- **Postman** (recomendado para documentação completa)

### Instruções para Teste Local:
Antes de iniciar os testes, certifique-se de que o ambiente está configurado:

1. **Inicie a API:** O servidor deve estar rodando localmente.

   ```bash
   npm run dev
   # ou
   docker compose up

2. **Base URL:** A API estará rodando no endereço padrão: http://localhost:3001

---

## 📌 Status do Projeto
🚧 Em desenvolvimento (MVP)
- Backend funcional
- Sensor de gás _simulado_
- Sem frontend
- Banco de dados em PostgreSQL

---

## 🔮 Próximos Passos (Evoluções Futuras)
- Integração com sensor físico de gás (IoT real)
- Desenvolvimento de frontend web/mobile
- Sistema de notificações
- Autenticação e controles de acesso
- Deploy completo da API

---

## 📄 Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

## 🎓 Programa, Apoio e Formação
**Bolsa Futuro Digital – Aponti**  
- Turma 33 PE C1
- Professora: _Kathlyn Letícia dos Santos_
- Site: https://aponti.org.br/