import { Router } from 'express'
import { moviesSqliteRepository } from '../../infra/repos/sqlite3/movies';

export default (router: Router): void => {
  router.get('/api/movies', async (req, res) => {
    console.log('=== request ===', req.query);
    const movies = await moviesSqliteRepository.loadAll(req.query);

      res.send(
        movies
      )
  })
}