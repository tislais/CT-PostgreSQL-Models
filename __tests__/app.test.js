
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Beer from '../lib/models/Beer.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a beer via POST', async () => {
    const res = await request(app)
      .post('/api/v1/beers')
      .send({ 
        name: 'barney',
        abv: '9%',
        color: 'dark'
      });
    expect(res.body).toEqual({
      id: 1,
      name: 'barney',
      abv: '9%',
      color: 'dark'
    });
  });

  it('finds a beer by id via GET', async () => {
    const beer = await Beer.insert({
      name: 'lagunitas',
      abv: '6.8%',
      color: 'medium dark'
    });
    const res = await request(app).get(`/api/v1/beers/${beer.id}`);
    expect(res.body).toEqual(beer);
  });
});
