import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Movie from '../lib/models/Movie.js';

describe('Movie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a movie via POST', async () => {
    const res = await request(app)
      .post('/api/v1/movies')
      .send({
        title: 'planet of the apes',
        genre: 'science fiction',
        rating: '8.0'
      });

    expect(res.body).toEqual({
      id: 1,
      title: 'planet of the apes',
      genre: 'science fiction',
      rating: '8.0'
    });
  });
});
