import { Router } from 'express';
import Machine from '../models/Machine';

export default Router()
  .post('/api/v1/machines', async (req, res) => {
    try {
      const machine = await Machine.insert(req.body);
      res.send(machine);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/machines/:id', async (req, res) => {
    try {
      const machine = await Machine.findById(req.params.id);
      res.send(machine);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/machines', async (req, res) => {
    try {
      const machines = await Machine.findAll();
      res.send(machines);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

;
