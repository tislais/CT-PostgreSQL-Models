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
 
  it('finds a movie by id via GET', async () => {
    const movie = await Movie.insert({
      title: 'burial ground',
      genre: 'horror',
      rating: '5.7'
    });
    const res = await request(app).get(`/api/v1/movies/${movie.id}`);
    
    expect(res.body).toEqual(movie);
  });

  it('finds all movies via GET', async () => {
    const movie1 = await Movie.insert({
      title: 'planet of the apes',
      genre: 'science fiction',
      rating: '8.9'
    });

    const movie2 = await Movie.insert({
      title: 'burial ground',
      genre: 'horror',
      rating: '5.6'
    });

    const res = await request(app).get('/api/v1/movies');
    expect(res.body).toEqual([movie1, movie2]);
  });

  it('updates a movie by id via PUT', async () => {
    const movie = await Movie.insert({
      title: 'burial ground',
      genre: 'horror',
      rating: '5.6'
    });

    const updatedMovie = {
      id: 1,
      title: 'burial ground',
      genre: 'horror',
      rating: '5.7'
    };

    const res = await request(app).put(`/api/v1/movies/${movie.id}`).send(updatedMovie);

    expect(res.body).toEqual(updatedMovie);
  });

  it('deletes a movie by id via DELETE', async () => {
    const movie = await Movie.insert({
      title: 'burial ground',
      genre: 'horror',
      rating: '5.6'
    });

    const res = await request(app)
      .delete(`/api/v1/movies/${movie.id}`)
      .send(movie);

    expect(res.body).toEqual(movie);
  });

});
