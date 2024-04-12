import { setupMiddlewares } from './middlewares';
import { setupRoutes } from './routes';
import express  from 'express';
const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("../../infra/repos/sqlite3/db");

const app = express();
setupMiddlewares(app);
setupRoutes(app);

export async function insertData() {
  await db.run('DELETE FROM migration', function(error) {
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
insertData();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

export { app }