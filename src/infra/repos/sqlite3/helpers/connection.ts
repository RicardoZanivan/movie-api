import sqlite3 from 'sqlite3';

export class SQLiteConnection {
  private static instance: SQLiteConnection;
  private db: sqlite3.Database | null = null;

  private constructor() {}

  public static getInstance(): SQLiteConnection {
    if (!SQLiteConnection.instance) {
      SQLiteConnection.instance = new SQLiteConnection();
    }
    return SQLiteConnection.instance;
  }

  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('== [DB] Connected to SQLite in memory database ==');
          resolve();
        }
      });
    });
  }

  public getDb(): sqlite3.Database | null {
    return this.db;
  }
}
