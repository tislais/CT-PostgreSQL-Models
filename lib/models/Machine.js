import pool from '../utils/pool';

export default class Machine {
  id;
  title;
  manufacturer;
  type;

  constructor(row) {
    this.id = Number(row.id);
    this.title = row.title;
    this.manufacturer = row.manufacturer;
    this.type = row.type;
  }

  static async insert({ title, manufacturer, type }) {
    const { rows } = await pool.query(`
      INSERT INTO machines (title, manufacturer, type)
      VALUES ($1, $2, $3)
      RETURNING *
      `, [title, manufacturer, type]
    );

    return new Machine(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    
      SELECT * FROM machines WHERE id = $1
      `, [id]);

    if (!rows[0]) return null;
    return new Machine(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM machines');
    return rows.map(row => new Machine(row));
  }

  static async update(machine, id) {
    const { rows } = await pool.query(`
      UPDATE machines
      SET title = $1, manufacturer = $2, type = $3
      WHERE id = $4
      RETURNING *
    `, [machine.title, machine.manufacturer, machine.type, id]);

    return new Machine(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM machines
      WHERE id = $1
      RETURNING *
    `, [id]);

    return new Machine(rows[0]);
  }

}
