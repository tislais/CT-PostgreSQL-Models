import { Router } from 'express';
import Beer from '../models/Beer';

export default Router()
  .post('/api/v1/beers', async (req, res) => {
    try {
      console.log('uhh', req.body);
      const beer = await Beer.insert(req.body);
      res.send(beer);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
