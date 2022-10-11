import pgp from 'pg-promise';

export default async function runPgSql(
  sql: string,
  options: {
    host: string;
    database: string;
    user: string;
    password: string;
  },
) {
  const client = pgp();
  const connection = client(options);
  try {
    await connection.none(sql);
  } finally {
    client.end();
  }
}
