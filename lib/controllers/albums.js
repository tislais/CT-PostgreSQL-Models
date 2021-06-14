import { Router } from 'express';
import Album from '../models/Album';

export default Router()
  .post('/api/v1/albums', async (req, res) => {
    try {
      const album = await Album.insert(req.body);
      res.send(album);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

;
