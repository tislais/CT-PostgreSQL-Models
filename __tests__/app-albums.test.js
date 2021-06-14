import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Album from '../lib/models/Album.js';

describe('Movie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

});
