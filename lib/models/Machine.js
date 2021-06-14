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

}
