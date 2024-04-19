import fs from 'fs';
import sqlite3 from 'sqlite3';
const { parse } = require("csv-parse");

export async function populateDatabaseFromCSV(filePath: string, db: sqlite3.Database): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.run(`CREATE TABLE IF NOT EXISTS movies (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            year        NUMERIC,
            title       VARCHAR(255),
            studios     VARCHAR(255),
            producers   VARCHAR(255),
            winner      BOOLEAN
        )`, (err) => {
            if (err) {
              console.error('Error creating table:', err);
              return;
            }
      
            const stream = fs.createReadStream(filePath)
              .pipe(parse({ delimiter: ';', from_line: 2 }));

            stream.on('data', (row) => {
              const winner: boolean = (row && row[4] && row[4] == 'yes') ? true : false;
              db.serialize(() => {
                db.run(
                  `INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)`,
                  [row[0], row[1], row[2], row[3], winner],
                  (error) => {
                    if (error) {
                      console.error('Error inserting row:', error);
                    }
                  }
                );
              });
            });

            stream.on('end', () => {
              console.log('CSV file successfully processed');
              resolve();
            });

            stream.on('error', (err) => {
              console.error('Error while processing CSV file:', err);
              reject(err);
            });
        });
    })
}
