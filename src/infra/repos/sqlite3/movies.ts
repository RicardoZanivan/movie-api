const db = require("../../../main/config/db");

interface YearWinnerCount {
    year: number;
    winnerCount: number;
  }

export class MoviesSqliteRepository {
    async loadAll(input?: {year?: number, winner?: 'yes' | 'no'}): Promise<any> {
        return new Promise((resolve, reject) => {
            let sql = `SELECT ID, * FROM migration`;

            const params = [];

            if (input.year !== undefined) {
                sql += ` WHERE year = ?`;
                params.push(input.year);
            }
    
            if (input.winner !== undefined) {
                if (params.length === 0) {
                    sql += ` WHERE winner = ?`;
                } else {
                    sql += ` AND winner = ?`;
                }
                params.push(input.winner);
            }
    
            sql += ` ORDER BY year ASC`;

            console.log('== sql ===', sql)

            db.all(sql, params, (err, rows) => {
                console.log('=== load all rows ===', rows)
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async loadTopStudios(): Promise<any> {
        return new Promise((resolve, reject) => {
            const sql = `
            WITH RECURSIVE Split(studio_name, studios_remaining) AS (
                SELECT 
                  TRIM(SUBSTR(studios, 1, INSTR(studios || ',', ',') - 1)) AS studio_name,
                  SUBSTR(studios, INSTR(studios || ',', ',') + 1) AS studios_remaining
                FROM migration
                WHERE studios <> ''
                and winner = 'yes'
                UNION ALL
                SELECT
                  TRIM(SUBSTR(studios_remaining, 1, INSTR(studios_remaining || ',', ',') - 1)) AS studio_name,
                  SUBSTR(studios_remaining, INSTR(studios_remaining || ',', ',') + 1) AS studios_remaining
                FROM Split
                WHERE studios_remaining <> ''
              )
              SELECT studio_name, COUNT(*) AS winCount
              FROM Split
              WHERE EXISTS (
                SELECT 1
                FROM migration
                WHERE winner = 'yes' AND studios LIKE '%' || studio_name || '%'
              )
              GROUP BY studio_name
              ORDER BY winCount DESC;
            `;

            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async loadTopYearsAwards(): Promise<any> {
        return new Promise((resolve, reject) => {
            const sql = `
              SELECT year, COUNT(*) as winnerCount
              FROM migration
              WHERE winner = 'yes'
              GROUP BY year
              ORDER BY winnerCount DESC
            `;
            db.all(sql, [], (err, rows) => {
              if (err) {
                reject(err);
              } else {
                const formattedRows: YearWinnerCount[] = rows.map(row => ({
                  year: row.year,
                  winnerCount: row.winnerCount
                }));
                resolve(formattedRows);
              }
            });
          });
    }

    async loadMinMaxInterval(): Promise<any> {
        return new Promise((resolve, reject) => {
            const producersMap = new Map<string, number[]>();

    const sql = `SELECT producers, year FROM migration WHERE winner = 'yes'`;
    db.all(sql, [], (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      // Iterar sobre os resultados da consulta
      rows.forEach(row => {
        const producers = row.producers.split(',').map(p => p.trim());
        const year = parseInt(row.year);
        
        // Calcular o intervalo entre prêmios para cada produtor
        producers.forEach(producer => {
          if (!producersMap.has(producer)) {
            producersMap.set(producer, []);
          }
          producersMap.get(producer)?.push(year);
        });
      });

      // Encontrar o produtor com o menor intervalo
      let minProducer: { producer: string, interval: number } | undefined;
      producersMap.forEach((years, producer) => {
        if (years.length >= 2) {
          years.sort((a, b) => a - b);
          const interval = years[years.length - 1] - years[0];
          if (!minProducer || interval < minProducer.interval) {
            minProducer = { producer, interval };
          }
        }
      });

      // Encontrar o produtor com o maior intervalo
      let maxProducer: { producer: string, interval: number } | undefined;
      producersMap.forEach((years, producer) => {
        if (years.length >= 2) {
          years.sort((a, b) => a - b);
          const interval = years[years.length - 1] - years[0];
          if (!maxProducer || interval > maxProducer.interval) {
            maxProducer = { producer, interval };
          }
        }
      });

      const result = {
        min: minProducer ? [{ producer: minProducer.producer, interval: minProducer.interval }] : [],
        max: maxProducer ? [{ producer: maxProducer.producer, interval: maxProducer.interval }] : []
      };
      resolve(result);
            });
        });
    }
}

export const moviesSqliteRepository = new MoviesSqliteRepository();