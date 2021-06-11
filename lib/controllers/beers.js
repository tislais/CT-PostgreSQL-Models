import { Router } from 'express';
import Beer from '../models/Beer';

export default Router()
  .post('/api/v1/beers', async (req, res) => {
    try {
      const beer = await Beer.insert(req.body);
      res.send(beer);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/beers/:id', async (req, res) => {
    try {
      const beer = await Beer.findById(req.params.id);
      res.send(beer);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });


