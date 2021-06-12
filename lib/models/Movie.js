import pool from '../utils/pool';

export default class Movie {
  id;
  title;
  genre;
  rating;

  constructor(row) {
    this.id = Number(row.id);
    this.title = row.title;
    this.genre = row.genre;
    this.rating = row.rating;
  }

  static async insert({ title, genre, rating }) {
    const { rows } = await pool.query(`
      INSERT INTO movies (title, genre, rating)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [title, genre, rating]
    );

    return new Movie(rows[0]);
  }
}
