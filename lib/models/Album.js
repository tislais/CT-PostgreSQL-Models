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

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT * FROM albums WHERE id = $1
      `, [id]);

    if (!rows[0]) return null;
    return new Album(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM albums');
    return rows.map(row => new Album(row));
  }

  static async update(album, id) {
    const { rows } = await pool.query(`
      UPDATE albums
      SET title = $1, artist = $2, genre = $3
      WHERE id = $4
      RETURNING *
      `, [album.title, album.artist, album.genre, id]
    );

    return new Album(rows[0]);
  }
}

