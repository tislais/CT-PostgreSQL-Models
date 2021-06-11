import 'dotenv/config.js';
import { promises as fs } from 'fs';
import path from 'path';

export default (pool) => {

  const pathToSlice = `${path.dirname(new URL(import.meta.url).pathname)}/../sql/setup.sql`;
  const replacedPath = pathToSlice.slice(1, pathToSlice.length);
  const filePath = replacedPath.replace('%', ' ');

  return fs
    .readFile(
      filePath,
      {
        encoding: 'utf-8',
      }
    )
    .then((sql) => pool.query(sql));
};
