import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Machine from '../lib/models/Machine.js';
import { response } from 'express';

describe('Machine routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a machine via POST', async () => {
    const res = await request(app)
      .post('/api/v1/machines')
      .send({
        title: 'attack from mars',
        manufacturer: 'bally',
        type: 'solid state'
      });

    expect(res.body).toEqual({
      id: 1,
      title: 'attack from mars',
      manufacturer: 'bally',
      type: 'solid state'
    });
  });

  it('finds a machine by id via GET', async () => {
    const machine = await Machine.insert({
      title: 'attack from mars',
      manufacturer: 'bally',
      type: 'solid state'
    });
    const res = await request(app).get(`/api/v1/machines/${machine.id}`);

    expect(res.body).toEqual(machine);
  });

  it('finds all machines via GET', async () => {
    const machine1 = await Machine.insert({
      title: 'attack from mars',
      manufacturer: 'bally',
      type: 'solid state'
    });

    const machine2 = await Machine.insert({
      title: 'the addams family',
      manufacturer: 'williams',
      type: 'solid state'
    });

    const res = await request(app).get('/api/v1/machines');
    expect(res.body).toEqual([machine1, machine2]);
  });


});
