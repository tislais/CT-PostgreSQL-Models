import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
//import Cube from '../lib/models/Cube.js';

describe('Cube routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a cube via POST', async () => {
    const res = await request(app)
      .post('/api/v1/cubes')
      .send({ 
        name: 'rubiks cube',
        dimensions: '3x3',
        price: '$12'
      });
    expect(res.body).toEqual({
      id: 1,
      name: 'rubiks cube',
      dimensions: '3x3',
      price: '$12'
    });
  });

});

