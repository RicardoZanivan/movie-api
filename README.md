# Movie API

A Movie API é uma aplicação Node.js desenvolvida com TypeScript para importar informações de filmes de um arquivo CSV para um banco de dados SQLite em memória. A API também identifica os vencedores de pior filme.

## Requisitos

- Node.js (v12.13.1 ou superior)
- TypeScript (v4.1.2)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/RicardoZanivan/movie-api.git
```
2. Navegue até o diretório do projeto:
```bash
cd movie-api
```
3. Instale as dependências:
```bash
npm install
```
## Uso
1. Para executar a API, utilize o seguinte comando:
```bash
npm run dev
```

- Se você tiver o Docker instalado, você também pode executar a API usando Docker Compose:
```bash
docker-compose up
```
2. **Funcionalidades:**
```markdown
- Importa informações de filmes de um arquivo CSV para um banco de dados SQLite em memória.
- Identifica os vencedores de pior filme.
```
## Estrutura do Projeto
movie-api/
│
├── src/
│ ├── config/
│ │ └── app.ts
│ ├── controllers/
│ │ └── movieController.ts
│ ├── infra/
│ │ └── repos/
│ │ └── sqlite3/
│ │ ├── db.ts
│ │ └── movies.ts
│ ├── main.ts
│ └── routes/
│ └── movieRoutes.ts
│
├── public/
│ └── movielist.csv
│
├── tests/
│ └── main/
│ └── routes/
│ └── movieRoutes.spec.ts
│
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── tsconfig.json

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou relatar um problema.