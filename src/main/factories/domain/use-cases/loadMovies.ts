import { LoadMovies } from '@/domain/use-cases'
import { MoviesSqliteRepository } from '@/infra/repos/sqlite3/movies'

export const makeLoadMovies = (): any => {
  const moviesSqliteRepository = new MoviesSqliteRepository()
  return new LoadMovies(moviesSqliteRepository)
}