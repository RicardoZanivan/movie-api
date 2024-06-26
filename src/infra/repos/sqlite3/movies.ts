import { SQLiteConnection } from './helpers';

interface YearWinnerCount {
    year: number;
    winnerCount: number;
  }

export class MoviesSqliteRepository {
  async loadAll(input?: {year?: number, winner?: boolean, page?: number}): Promise<any> {
    const db = SQLiteConnection.getInstance().getDb();

    return new Promise((resolve, reject) => {
      let sql = `SELECT ID, * FROM movies`;
      
      const params = [];

      if (input.year !== undefined) {
          sql += ` WHERE year LIKE ?`;
          params.push(`%${input.year}%`);
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

      const pageSize = 99;
      const pageNumber = input.page || 1;
      const offset = (pageNumber - 1) * pageSize;

      sql += ` LIMIT ? OFFSET ?`;
      params.push(pageSize, offset);

      db.all(sql, params, (err, rows) => {
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
      });
    });
  }

  async loadTopStudios(): Promise<any> {
    const db = SQLiteConnection.getInstance().getDb();

    return new Promise((resolve, reject) => {
      const sql = `
        WITH RECURSIVE Split(studio_name, studios_remaining) AS (
          SELECT 
            TRIM(SUBSTR(studios, 1, INSTR(studios || ',', ',') - 1)) AS studio_name,
            SUBSTR(studios, INSTR(studios || ',', ',') + 1) AS studios_remaining
          FROM movies
          WHERE studios <> ''
          and winner = true
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
          FROM movies
          WHERE winner = true AND studios LIKE '%' || studio_name || '%'
        )
        GROUP BY studio_name
        ORDER BY winCount DESC
        LIMIT 3;
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

  async loadMinMaxInterval(): Promise<any> {
    const db = SQLiteConnection.getInstance().getDb();

    return new Promise((resolve, reject) => {

      const producersMap = new Map<string, number[]>();
  
      const sql = `SELECT producers, year FROM movies WHERE winner = true`;
      db.all(sql, [], (error, rows) => {
        if (error) {
          reject(error);
          return;
        }
  
        // Iterar sobre os resultados da consulta
        rows.forEach((row: any) => {
          const producers = row.producers.replace(/,\s+and\s+/g, ' and ').split(/,\s| and /).map(p => p.trim());
          // const producers = row.producers.split(/,\s| and /).map(p => p.trim());
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
        let minProducers: { producer: string, interval: number, previousWin: number, followingWin: number }[] = [];
        producersMap.forEach((years, producer) => {
          if (years.length >= 2) {
            years.sort((a, b) => a - b);
            const interval = years[years.length - 1] - years[0];
            const previousWin = years[0];
            const followingWin = years[years.length - 1];
            if (minProducers.length === 0 || interval === minProducers[0].interval) {
              minProducers.push({ producer, interval, previousWin, followingWin });
            } else if (interval < minProducers[0].interval) {
              minProducers = [{ producer, interval, previousWin, followingWin }];
            }
          }
        });
  
        // Encontrar o produtor com o maior intervalo
        let maxProducers: { producer: string, interval: number, previousWin: number, followingWin: number }[] = [];
        producersMap.forEach((years, producer) => {
          if (years.length >= 2) {
            years.sort((a, b) => a - b);
            const interval = years[years.length - 1] - years[0];
            const previousWin = years[0];
            const followingWin = years[years.length - 1];
            if (maxProducers.length === 0 || interval === maxProducers[0].interval) {
              maxProducers.push({ producer, interval, previousWin, followingWin });
            } else if (interval > maxProducers[0].interval) {
              maxProducers = [{ producer, interval, previousWin, followingWin }];
            }
          }
        });
  
        const result = {
          min: minProducers,
          max: maxProducers
        };
        resolve(result);
      });
    });
  }

  async loadTopYearsAwards(): Promise<any> {
    const db = SQLiteConnection.getInstance().getDb();

    return new Promise((resolve, reject) => {
      const sql = `
        SELECT year, COUNT(*) as winnerCount
        FROM movies
        WHERE winner = true
        GROUP BY year
        HAVING COUNT(*) > 1
        ORDER BY winnerCount DESC
      `;
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const formattedRows: YearWinnerCount[] = rows.map((row: any) => ({
            year: row.year,
            winnerCount: row.winnerCount
          }));
          resolve(formattedRows);
        }
      });
    });
  }
}

export const moviesSqliteRepository = new MoviesSqliteRepository();