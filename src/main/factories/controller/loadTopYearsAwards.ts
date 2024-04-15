import { LoadTopYearsAwardsController } from '@/application/controllers'
import { makeTopYearsAwards } from '@/main/factories/domain/use-cases'

export const makeLoadTopYearsAwardsController = (): LoadTopYearsAwardsController => {
  return new LoadTopYearsAwardsController(makeTopYearsAwards())
}