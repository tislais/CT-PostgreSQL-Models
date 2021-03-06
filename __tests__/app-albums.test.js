import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Album from '../lib/models/Album.js';

describe('Album routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an album via POST', async () => {
    const res = await request(app)
      .post('/api/v1/albums')
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

  it('finds an album by id via GET', async () => {
    const album = await Album.insert({
      title: '1986',
      artist: 'one last wish',
      genre: 'post-hardcore'
    });
    const res = await request(app).get(`/api/v1/albums/${album.id}`);

    expect(res.body).toEqual(album);
  });

  it('finds all albums via GET', async () => {
    const album1 = await Album.insert({
      title: '1986',
      artist: 'one last wish',
      genre: 'post-hardcore'
    });

    const album2 = await Album.insert({
      title: 'volume 1',
      artist: 'magic sword',
      genre: 'dark synthwave'
    });

    const res = await request(app).get('/api/v1/albums');
    expect(res.body).toEqual([album1, album2]);
  });

  it('updates an album by id via PUT', async () => {
    const album = await Album.insert({
      title: 'volume 1',
      artist: 'magic sword',
      genre: 'dark synthwave'
    });

    const updatedAlbum = {
      id: 1,
      title: 'volume 2',
      artist: 'magic sword',
      genre: 'dark synthwave'
    };

    const res = await request(app).put(`/api/v1/albums/${album.id}`).send(updatedAlbum);
    expect(res.body).toEqual(updatedAlbum);
  });

  it('deletes an album by id via DELETE', async () => {
    const album = await Album.insert({
      title: 'volume 1',
      artist: 'magic sword',
      genre: 'dark synthwave'
    });

    const res = await request(app)
      .delete(`/api/v1/albums/${album.id}`)
      .send(album);

    expect(res.body).toEqual(album);
  });

});
