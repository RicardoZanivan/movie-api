import { makeMinMaxIntervalAwards } from '@/main/factories/domain/use-cases'
import { LoadProductorsAwardsIntervalController } from '../../../application/controllers'

export const makeLoadProductorsAwardsIntervalController = (): LoadProductorsAwardsIntervalController => {
  return new LoadProductorsAwardsIntervalController(makeMinMaxIntervalAwards())
}