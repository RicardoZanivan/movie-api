import { makeMoviesSqliteRepository } from '@/main/factories/infra/repos/sqlite3'
import { setupTopStudiosAwards, TopStudiosAwards } from '@/domain/use-cases'

export const makeTopStudiosAwards = (): TopStudiosAwards => {
  return setupTopStudiosAwards(
    makeMoviesSqliteRepository()
  )
}