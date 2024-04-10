import { Router } from 'express'
import { loadAwards } from '../config/loadAwards';

export default (router: Router): void => {
  router.get('/api/award-interval', (req, res) => {
    loadAwards();

      res.send({
          "min": [
              {
                  "producer": "Producer 1",
                  "interval": 1,
                  "previousWin": 2008,
                  "followingWin": 2009
              },
              {
                  "producer": "Producer 2",
                  "interval": 1,
                  "previousWin": 2018,
                  "followingWin": 2019
              }
          ],
          "max": [
              {
                  "producer": "Producer 1",
                  "interval": 99,
                  "previousWin": 1900,
                  "followingWin": 1999
              },
              {
                  "producer": "Producer 2",
                  "interval": 99,
                  "previousWin": 2000,
                  "followingWin": 2099
              }
          ]
      })
  })
}