import { Client } from 'pg';

export default async function runPgSql(
  sql: string,
  options: {
    host: string;
    database: string;
    user: string;
    password: string;
  },
) {
  const connection = new Client(options);
  await connection.connect();
  try {
    await connection.query(sql);
  } finally {
    connection.end();
  }
}
