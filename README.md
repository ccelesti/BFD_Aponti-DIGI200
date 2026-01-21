# Sistema de Gerenciamento e Alerta de Gás  
### DIGI-200 • Bolsa Futuro Digital (Softex / Aponti)

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)

---

## 📝 Descrição Geral

O **Sistema de Gerenciamento e Alerta de Gás** faz parte do _Projeto Integrador_ desenvolvido no contexto do programa [*Bolsa Futuro Digital*](https://aponti.org.br/capital-humano#programa-bfd) (Softex / [*Aponti*](https://aponti.org.br/) - Recife)**, como atividade de culminância da formação, pela equipe **DIGI-200**, da _Turma 33 PE C1 - Back-end JavaScript/TypeScript_.

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
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Principais Rotas da API](#-principais-rotas-da-api)
- [Testes das Rotas](#-testes-das-rotas)
- [Status do Projeto](#-status-do-projeto)
- [Próximos Passos (Evoluções Futuras)](#-próximos-passos-evoluções-futuras)
- [Equipe e Contribuições](#equipe-e-contribuições)
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

### Backend
- **Node.js** – Ambiente de execução do servidor backend.
- **Express** – Framework para construção das APIs RESTful.
- **TypeScript** – Linguagem principal do projeto, garantindo tipagem estática e maior segurança.

### Banco de Dados
- **PostgreSQL** – Banco de dados relacional, utilizado tanto em ambiente local (Docker) quanto em nuvem (Render).

### Simulação IoT
- **Node-RED** – Ferramenta utilizada para simular o sensor de gás, gerando dados mockados que representam o funcionamento de um sensor físico real.

### Infraestrutura
- **Docker** – Conteinerização dos serviços do sistema.
- **Docker Compose** – Orquestração dos containers para ambiente de desenvolvimento.
- **Render** – Hospedagem do banco de dados PostgreSQL em nuvem.

### Ferramentas de Qualidade e Suporte
- **Thunder Client** – Testes rápidos das rotas da API no VS Code.
- **Postman** – Documentação e validação das rotas.
- **dotenv** – Gerenciamento de variáveis de ambiente.

---
## Equipe e Contribuições: 
 ### 👩🏽‍💻🧑🏿‍💻 Contribuições dos integrantes no projeto:

| Nome | Contribuição | Roles | Linkedin | Github |
|------|--------------|-------|----------|--------|
| **Camila Moura** | **Gestão do Projeto:** condução de reuniões, definição de pautas, mediação com o cliente e liderança do time; **Concepção do Produto:** brainstorming, reuniões com o cliente e sugestões no protótipo (Figma); **Planejamento e Backlog:** organização e priorização do backlog no Trello, padronização de requisitos e revisão das contribuições; **Documentação:** consolidação da versão inicial, reconstrução da documentação final, redefinição dos requisitos funcionais e ajuste do escopo do MVP; **Banco de Dados:** modelagem, definição de tabelas e relacionamentos, scripts SQL, população via pgAdmin/PostgreSQL e via requisições HTTP, integração do PostgreSQL com a API; **Arquitetura Backend:** definição do padrão MVC, escolha das tecnologias e organização da estrutura do projeto. | Product Owner, Líder Técnica, Desenvolvedora Backend | [/camilacelestino](https://www.linkedin.com/in/camilacelestino) | [/ccelesti](https://github.com/ccelesti) |
| **Ruberval Brasileiro** | **Concepção do Produto:** participação em brainstormings e reuniões com o cliente; **Planejamento e Organização:** apoio nos próximos passos do projeto e atuação informal como vice-líder; **Documentação:** elaboração da versão inicial, pesquisa da lógica de negócio e apoio à modelagem conceitual; **Protótipo (Figma):** criação de fluxos de telas e ajustes conforme feedback do time; **Desenvolvimento Backend:** implementação de validações de dados; **Apoio à Equipe:** orientação sobre uso do Trello e Google Docs. | Design & Dev Team | [/ruberval-brasileiro](https://www.linkedin.com/in/ruberval-brasileiro-5996a7324/) | [/rubervalbrasileiro](https://github.com/rubervalbrasileiro) |
| **Cícera Maria** | **Concepção do Produto:** participação em brainstormings e reuniões com o cliente; **Planejamento e Backlog:** apoio na construção e organização do backlog no Trello; **Documentação:** suporte na elaboração da documentação final, com transcrição e organização dos requisitos funcionais (RF) e não funcionais (RNF). | Docs Team | — | [/ciceradevback](https://github.com/ciceradevback) |
| **Adriel Gomes** | **Concepção do Produto:** participação em brainstormings, reuniões com o cliente e sugestões no protótipo (Figma); **Desenvolvimento Backend:** desenvolvimento de funções e lógica relacionadas ao sensor virtual do botijão de gás. | Dev Team | [/adriel-gomes](https://www.linkedin.com/in/adriel-gomes-472974218/) | [/Adriel-grs](https://github.com/Adriel-grs) |
| **João Henrique** | **Concepção do Produto:** participação em brainstormings e reuniões com o cliente; **Gestão Inicial do Projeto:** atuação como líder no início do projeto, conduzindo reuniões e organizando as primeiras atividades; **Documentação:** apoio na construção da primeira versão da documentação. *(Posteriormente desligou-se do projeto durante a fase prática.)* | Líder Inicial | [/joao-melo](https://www.linkedin.com/in/joao-melo16/) | [/Dev-JoaoMelo](https://github.com/Dev-JoaoMelo) |


---
<br>

### 🧑🏻‍💻 Contribuições de Colaboradores Externos no projeto:

| Nome | Contribuição | Roles | Linkedin | Github |
|------|--------------|-------|----------|--------|
| **Gabriel Lucas** | **Documentação do Projeto:** participação ativa na reconstrução dos requisitos, discussões sobre regras de negócio e refinamento da documentação; **Banco de Dados:** acompanhamento da modelagem, sugestões técnicas, apoio na criação e execução de scripts SQL e criação de views para consultas do sistema; **Desenvolvimento Backend:** desenvolvimento de funções e lógica relacionadas ao domínio de Fornecedores. | Backend & Database Support | [/gabriel-lucas](https://www.linkedin.com/in/gabriel-lucas-de-oliveira-xavier-507564358/) | [/Ggeasy1574](https://github.com/Ggeasy1574) |
| **Leonardo Rafael** | **Documentação do Projeto:** suporte técnico na reconstrução e validação dos requisitos e decisões de escopo; **Arquitetura e Tecnologias:** sugestões sobre banco de dados, arquitetura MVC, dependências e ferramentas de desenvolvimento; **Versionamento e Execução:** orientações sobre Git/GitHub e etapas iniciais de execução do projeto; **Comunicação e Apresentação:** apoio na elaboração do README, desenvolvimento dos slides do pitch e suporte à evolução da logotipo. | Consultoria Técnica | [/leonardorafael1604](https://www.linkedin.com/in/leonardorafael1604/) | [/LeonardoRDA1604](https://github.com/LeonardoRDA1604) |
| **Samuel Victor** | **Documentação do Projeto:** apoio na etapa final de revisão e padronização da documentação, com melhoria da escrita, verificação de consistência das informações e adequação ao formato final, seguindo orientações da liderança. | Documentação & Revisão | [/samuel-victor](https://www.linkedin.com/in/samuel-victor-3426b3368/) | [/samuel-victorr](https://github.com/SamuelVictorr) |
| **Leandro** | **Identidade Visual:** melhorias na logotipo do projeto, com ajustes de definição, cores e tipografia, contribuindo para a identidade visual final. | Design Gráfico | — | — |

---

## 🧱 Arquitetura do Projeto

```bash
BFD_APONTI-DIGI200/
├── back-end/
│   ├── node_modules/
│   │
│   ├── scripts/                  # Scripts SQL
│   │   └── schema.sql
│   │
│   ├── src/
│   │   ├── controllers/          # Lógica das requisições
│   │   │   ├── cliente.controller.ts
│   │   │   ├── fornecedor.controller.ts
│   │   │   ├── bairrofornecedor.controller.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── routes/               # Definição das rotas da API
│   │   │   ├── cliente.routes.ts
│   │   │   ├── fornecedor.routes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── database/             # Configuração do banco de dados
│   │   │   └── db.ts
│   │   │
│   │   ├── app.ts                # Configuração principal da aplicação
│   │   └── models.ts             # Tipagens / interfaces
│   │
│   ├── dockerfile                # Docker do backend
│   ├── docker.ignore
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── iot-simulator/                # Simulador do sensor de gás (Node-RED)
│
├── .env                          # Variáveis de ambiente
├── .env.example                  # Exemplo de variáveis de ambiente
├── docker-compose.yml            # Orquestração dos serviços
├── .gitignore
├── LICENSE
└── README.md                     # README do Projeto
```


back-end/
├── src/
│   ├── routes/        → Recebe as requisições HTTP e define os endpoints da API
│   ├── controllers/   → Contém a lógica que processa a requisição e chama os serviços/repositórios
│   ├── database/      → Configura a conexão com o banco de dados
│   ├── models.ts      → Define interfaces e tipagens do sistema
│   └── app.ts         → Inicializa a aplicação e registra middlewares e rotas

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

📁 .env (raiz do projeto)

Responsável pela configuração da infraestrutura Docker, banco de dados e Node-RED.

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

📁 back-end/.env

Responsável exclusivamente pela API desenvolvida em Node.js/Express.

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

## 6️⃣ Execução com Docker Compose (novo e essencial)

Na raiz do projeto, execute o comando:

```bash
docker compose up -d
```

Esse comando irá:
-subir o backend;
-inicializar o banco de dados PostgreSQL;
-disponibilizar o ambiente completo para desenvolvimento.


---
## 🔗 Principais Rotas da API
As rotas seguem o padrão REST e estão organizadas por domínio (clientes, fornecedores, endereços).
👤 Clientes

---
## 🧪 Testes das Rotas
As rotas podem ser testadas com:
- Thunder Client (Extensão do VS Code)
- Postman (Coleções documentadas)

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
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

## ✨ Autoria
Projeto desenvolvido pelo grupo DIGI-200
Programa Bolsa Futuro Digital – Softex / Aponti

## 🎓 Programa, Apoio e Formação

**Bolsa Futuro Digital – Softex/Aponti**  
Turma 33 PE C1
Professora: _Kathlyn Letícia dos Santos_
Site: https://aponti.org.br/