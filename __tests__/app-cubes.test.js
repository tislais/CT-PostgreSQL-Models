import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cube from '../lib/models/Cube.js';

describe('Cube routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a cube via POST', async () => {
    const res = await request(app)
      .post('/api/v1/beers')
      .send({
        name: 'rubiks cube',
        dimensions: '3x3',
        price: '$10'
      });
    expect(res.body).toEqual({
      id: 1,
      dimensions: '3x3',
      price: '$10'
    });
  });
});
