import { makeTopStudiosAwards } from '@/main/factories/domain/use-cases'
import { LoadTopStudiosAwardsController } from '../../../application/controllers'

export const makeLoadTopStudiosAwardsController = (): LoadTopStudiosAwardsController => {
  return new LoadTopStudiosAwardsController(makeTopStudiosAwards())
}