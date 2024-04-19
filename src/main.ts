import { SQLiteConnection } from './infra/repos/sqlite3/helpers';
import { populateDatabaseFromCSV } from './infra/services';
import { env } from './main/config/env';

SQLiteConnection.getInstance().connect()
  .then(async () => {
    const db = SQLiteConnection.getInstance().getDb();
    await populateDatabaseFromCSV('public/movielist.csv', db);

    const { app } = await import('@/main/config/app');
    app.listen(env.port, () => console.log(`=== Movies server running at http://localhost:${env.port} ===`));
  })
  .catch(console.error);