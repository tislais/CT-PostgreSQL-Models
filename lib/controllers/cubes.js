import { Router } from 'express';
import Cube from '../models/Cube';

export default Router()
  .post('/api/v1/cubes', async (req, res) => {
    try {
      const cube = await Cube.insert(req.body);
      res.send(cube);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .get('/api/v1/cubes/:id', async (req, res) => {
    try {
      const cube = await Cube.findById(req.params.id);
      res.send(cube);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
