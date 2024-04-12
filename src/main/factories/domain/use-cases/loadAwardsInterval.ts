import { LoadProductorsAwardsInterval } from '@/domain/use-cases'
import { LoadAwardsInterval } from '@/domain/contracts/repos'
import { MoviesSqliteRepository } from '@/infra/repos/sqlite3/movies'

export const makeLoadAwardsInterval = (): LoadAwardsInterval => {
  const moviesSqliteRepository = new MoviesSqliteRepository()
  return new LoadProductorsAwardsInterval(moviesSqliteRepository)
}