import pool from '../utils/pool';

export default class Beer {
  id;
  name;
  abv;
  color;

  constructor(row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.abv = row.abv;
    this.color = row.color;
  }

  static async insert({ name, abv, color }) {
    const { rows } = await pool.query(
      'INSERT INTO beers (name, abv, color) VALUES ($1, $2, $3) RETURNING *', 
      [name, abv, color]
    );

    return new Beer(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM beers WHERE id = $1',
      [id]
    );
    
    if (!rows[0]) return null;

    return new Beer(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM beers');
    
    return rows.map(row => new Beer(row));
  }

  static async update(beer, id) {
    const { rows } = await pool.query(`
      UPDATE beers 
      SET name = $1, abv = $2, color = $3 
      WHERE id = $4 
      RETURNING *`, [beer.name, beer.abv, beer.color, id]);
    return new Beer(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM beers
      WHERE id = $1
      RETURNING *
    `, [id]);

    return new Beer(rows[0]);
  }
}
