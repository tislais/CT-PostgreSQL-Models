import { Router } from 'express';
import Cube from '../models/Cube';
import Movie from '../models/Movie';

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
  })
  
  .get('/api/v1/cubes', async (req, res) => {
    try {
      const cubes = await Cube.findAll();
      res.send(cubes);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .put('/api/v1/cubes/:id', async (req, res) => {
    try {
      const movie = await Cube.update(req.body, req.params.id);
      res.send(movie);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .delete('/api/v1/cubes/:id', async (req, res) => {
    try {
      const cube = await Cube.delete(req.params.id);
      res.send(cube);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
  
;


