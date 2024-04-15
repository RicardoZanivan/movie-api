import { MinMaxIntervalAwards, setupMinMaxIntervalAwards } from '@/domain/use-cases'
import { makeMoviesSqliteRepository } from '@/main/factories/infra/repos/sqlite3'

export const makeMinMaxIntervalAwards = (): MinMaxIntervalAwards => {
  return setupMinMaxIntervalAwards(
    makeMoviesSqliteRepository()
  )
}