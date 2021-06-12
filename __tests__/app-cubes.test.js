import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cube from '../lib/models/Cube.js';
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

  it('finds a cube by id via GET', async () => {
    const cube = await Cube.insert({
      name: 'supercube',
      dimensions: '4x4',
      price: '$18'
    });
    const res = await request(app).get(`/api/v1/cubes/${cube.id}`);
    expect(res.body).toEqual(cube);
  });

  it('finds all cubes via GET', async () => {
    const squareOne = await Cube.insert({
      name: 'square-1',
      dimensions: 'irregular',
      price: '$24'
    });

    const megaminx = await Cube.insert({
      name: 'megaminx',
      dimensions: 'irregular',
      price: '$32'
    });

    const res = await request(app).get('/api/v1/cubes');
    expect(res.body).toEqual([squareOne, megaminx]);
  });

});
