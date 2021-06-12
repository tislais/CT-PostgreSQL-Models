import pool from '../utils/pool';

export default class Cube {
  id;
  name;
  abv;
  color;

  constructor(row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.dimensions = row.dimensions;
    this.price = row.price;
  }

  static async insert({ name, dimensions, price }) {
    const { rows } = await pool.query(
      'INSERT INTO cubes (name, dimensions, price) VALUES ($1, $2, $3) RETURNING *', 
      [name, dimensions, price]
    );

    return new Cube(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT * FROM cubes WHERE id = $1
      `, [id]
    );

    if (!rows[0]) return null;

    return new Cube(rows[0]);
  }
}
