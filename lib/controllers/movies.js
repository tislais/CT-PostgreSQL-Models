import { Router } from 'express';
import Movie from '../models/Movie';

export default Router()
  .post('/api/v1/movies', async (req, res) => {
    try {
      const movie = await Movie.insert(req.body);
      res.send(movie);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/movies/:id', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.send(movie);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/movies', async (req, res) => {
    try {
      const movies = await Movie.findAll();
      res.send(movies);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/movies/:id', async (req, res) => {
    try {
      const movie = await Movie.update(req.body, req.params.id);
      res.send(movie);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/movies/:id', async (req, res) => {
    try {
      const movie = await Movie.delete(req.params.id);
      res.send(movie);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
;
