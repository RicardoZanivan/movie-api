import { makeLoadAwardsInterval } from '@/main/factories/domain/use-cases'
import { LoadProductorsAwardsIntervalController } from '../../../application/controllers'
import { Controller } from '@/application/controllers/controller'

export const makeLoadProductorsAwardsIntervalController = (): Controller => {
  return new LoadProductorsAwardsIntervalController(makeLoadAwardsInterval())
}