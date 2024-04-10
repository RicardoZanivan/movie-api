import { Router } from 'express'
import { moviesSqliteRepository } from '../../infra/repos/sqlite3/movies';

export default (router: Router): void => {
  router.get('/api/topyearsawards', async (req, res) => {
    console.log('=== request ===', req.query);
    const studios = await moviesSqliteRepository.loadTopYearsAwards();

      res.send(
        studios
      )
  })
}