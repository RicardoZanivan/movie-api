import { Router } from 'express';

import { makeLoadMoviesController } from '../factories/controller';
import { adaptRoute } from '../adapters';

export default (router: Router): void => {
    router.get('/api/movies', adaptRoute(makeLoadMoviesController()));
}