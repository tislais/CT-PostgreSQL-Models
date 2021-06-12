import movies from '../controllers/movies';
import pool from '../utils/pool';
import Cube from './Cube';

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

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT * FROM movies WHERE id = $1    
      `, [id]
    );
    
    if (!rows[0]) return null;
    return new Movie(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM movies');
    return rows.map(row => new Movie(row));
  }

  static async update(movie, id) {
    const { rows } = await pool.query(`
      UPDATE movies
      SET title = $1, genre = $2, rating = $3
      WHERE id = $4
      RETURNING *
      `, [movie.title, movie.genre, movie.rating, id]
    );

    return new Movie(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM movies
      WHERE id = $1
      RETURNING *
    `, [id]);

    return new Movie(rows[0]);
  }
}
