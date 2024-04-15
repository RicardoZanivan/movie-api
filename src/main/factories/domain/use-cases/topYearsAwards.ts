import { makeMoviesSqliteRepository } from '@/main/factories/infra/repos/sqlite3'
import { setupTopYearsAwards, TopYearsAwards } from '@/domain/use-cases'

export const makeTopYearsAwards = (): TopYearsAwards => {
  return setupTopYearsAwards(
    makeMoviesSqliteRepository()
  )
}