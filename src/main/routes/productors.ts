import { Router } from 'express';

import { makeLoadProductorsAwardsIntervalController } from '../factories/controller';
import { adaptRoute } from '../adapters';

export default (router: Router): void => {
    router.get('/api/productors/awardsInterval', adaptRoute(makeLoadProductorsAwardsIntervalController()));
}