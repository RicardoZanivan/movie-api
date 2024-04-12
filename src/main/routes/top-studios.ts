import { Router } from 'express'
import { moviesSqliteRepository } from '../../infra/repos/sqlite3/movies';

export default (router: Router): void => {
  router.get('/api/topstudios', async (req, res) => {
    const studios = await moviesSqliteRepository.loadTopStudios();

      res.send(
        studios
      )
  })
}