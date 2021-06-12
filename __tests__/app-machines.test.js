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
    const res = await response(app)
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
});
