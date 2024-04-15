import { MoviesSqliteRepository } from '@/infra/repos/sqlite3/movies'

export const makeMoviesSqliteRepository = (): MoviesSqliteRepository => {
  return new MoviesSqliteRepository()
}