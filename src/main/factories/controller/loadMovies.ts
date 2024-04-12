import { makeLoadMovies } from '@/main/factories/domain/use-cases'
import { LoadMoviesController } from '../../../application/controllers'

export const makeLoadMoviesController = (): LoadMoviesController => {
  return new LoadMoviesController(makeLoadMovies())
}