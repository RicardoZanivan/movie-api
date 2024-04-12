import { setupMiddlewares } from './middlewares';
import { setupRoutes } from './routes';
import express  from 'express';
// import { createReadStream } from 'node:fs'
// import { Readable, Transform } from 'node:stream'
// import { WritableStream, TransformStream } from 'node:stream/web'
const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("./db");

const dbFilePath = "../../../population.db";

const app = express();
setupMiddlewares(app);
setupRoutes(app);

console.log('=== passou aqui ===')
// export async function initializeApp() {
//   try {
//     // Inicialize a leitura do arquivo CSV usando seu serviço CSV
//     // const csvData = await CsvService.readCsvFile('caminho/do/arquivo.csv');

//     let items: 0;
//     let movies: any[] = []
//     Readable.toWeb(createReadStream('./public/movielist.csv'))
//       .pipeTo(new WritableStream({
//         write(chunk) {
//           console.log('=== chunk ===', chunk)
//           items ++
//         },
//         close() {
//           console.log('=== total items ===', items)
//         }
//       }))

//     // Faça algo com os dados CSV, como salvar no banco de dados ou usar em outros lugares
//     console.log('Dados CSV lidos:', );
//   } catch (error) {
//     console.error('Erro ao ler o arquivo CSV:', error);
//     // Lide com o erro de alguma forma apropriada
//   }
// }
// initializeApp();

export async function insertData() {
  db.run('DELETE FROM migration', function(error) {
    if (error) {
      return console.error('Erro ao limpar a tabela:', error.message);
    }
    console.log('Tabela limpa com sucesso passou.');
  });

  fs.createReadStream("public/movielist.csv")
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", function (row) {
      db.serialize(function () {
        db.run(
          `INSERT INTO migration VALUES (?, ?, ? , ?, ?, ?)`,
          [this.lastID, row[0], row[1], row[2], row[3], row[4]],
          function (error) {
            if (error) {
              return console.log(error.message);
            }
          }
        );
      });
    });
}
insertData()

app.get('/', (req, res) => {
  res.send('Hello world!');
});

export { app }