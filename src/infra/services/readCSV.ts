import fs from 'fs';
import sqlite3 from 'sqlite3';
const { parse } = require("csv-parse");

export async function populateDatabaseFromCSV(filePath: string, db: sqlite3.Database): Promise<void> {
    
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
  
        fs.createReadStream(filePath)
            .pipe(parse({ delimiter: ";", from_line: 2 }))
            .on('data', (row) => {
                const winner: boolean = (row && row[4] && row[4] == 'yes') ? true : false;
                db.serialize(function () {
                    db.run(
                    `INSERT INTO movies VALUES (?, ?, ? , ?, ?, ?)`,
                    [this.lastID, row[0], row[1], row[2], row[3], winner],
                    function (error) {
                        if (error) {
                            return console.log(error.message);
                        }
                        console.log(`Inserted a row with the id: ${this.lastID}`);
                    }
                    );
                });
            })
            .on('end', async () => {
                console.log('CSV file successfully processed');
            })
            .on('error', (err) => {
                console.error('Error while processing CSV file:', err);
            });
        });

}
