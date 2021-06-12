
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

  it('finds all beers via GET', async () => {
    const rainier = await Beer.insert({
      name: 'rainier',
      abv: '4.8%',
      color: 'clear as the mountain snow of mount rainier'
    });
    
    const modelo = await Beer.insert({
      name: 'modelo',
      abv: '4.5%',
      color: 'pale'
    });
    
    const heineken = await Beer.insert({
      name: 'heineken',
      abv: '4.2%',
      color: 'pale'
    });

    const res = await request(app).get('/api/v1/beers');
    expect(res.body).toEqual([rainier, modelo, heineken]);
  });

  it('updates a beer by id via PUT', async () => {
    const rainier = await Beer.insert({
      name: 'rainier',
      abv: '4.8%',
      color: 'clear as the mountain snow of mount rainier'
    });
    
    const updatedRainier = {
      id: 1,
      name: 'rainierv2',
      abv: '4.8%',
      color: 'clear as the mountain snow of mount rainier'
    };

    const res = await request(app).put(`/api/v1/beers/${rainier.id}`).send(updatedRainier);
    expect(res.body).toEqual(updatedRainier);
  });

  it('deletes a beer by ida via DELETE', async () => {
    const rainier = await Beer.insert({
      name: 'rainier',
      abv: '4.8%',
      color: 'clear as the mountain snow of mount rainier'
    });

    const res = await request(app)
      .delete(`/api/v1/beers/${rainier.id}`)
      .send(rainier);

    expect(res.body).toEqual(rainier);
  });
});

