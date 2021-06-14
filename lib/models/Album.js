import pool from '../utils/pool';

export default class Album {
  id;
  title;
  artist;
  genre;

  constructor(row) {
    this.id = Number(row.id);
    this.title = row.title;
    this.artist = row.artist;
    this.genre = row.genre;
  }

  static async insert({ title, artist, genre }) {
    const { rows } = await pool.query(`
      INSERT INTO albums (title, artist, genre)
      VALUES ($1, $2, $3)
      RETURNING *
      `, [title, artist, genre]
    );

    return new Album(rows[0]);
  }
}

