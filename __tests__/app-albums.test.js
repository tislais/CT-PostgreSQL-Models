import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Album from '../lib/models/Album.js';

describe('Movie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an album via POST', async () => {
    const res = await request(app)
      .post('/api/m1/albums')
      .send({
        title: '1986',
        artist: 'one last wish',
        genre: 'post-hardcore'
      });

    expect(res.body).toEqual({
      id: 1,
      title: '1986',
      artist: 'one last wish',
      genre: 'post-hardcore'
    });
  });

});
