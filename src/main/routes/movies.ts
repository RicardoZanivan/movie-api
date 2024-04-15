import { Router } from 'express';

import { makeLoadMoviesController, makeLoadTopStudiosAwardsController, makeLoadTopYearsAwardsController } from '../factories/controller';
import { adaptRoute } from '../adapters';

export default (router: Router): void => {
    router.get('/api/movies/topyears', adaptRoute(makeLoadTopYearsAwardsController()));
    router.get('/api/movies/topstudios', adaptRoute(makeLoadTopStudiosAwardsController()));
    router.get('/api/movies', adaptRoute(makeLoadMoviesController()));
}