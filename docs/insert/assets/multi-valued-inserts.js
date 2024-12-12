// @ts-check

import pg from 'pg';

const { Client } = pg;
const client = new Client();

await client.connect();

/**
 *
 * @param {{id: string, name: string}[]} users
 */
async function multiValuedInsert(users) {
  let batchCount = 0;
  const sql = 'INSERT INTO users VALUES';
  let values = [];
  let parameters = [];

  for (let i = 0; i < users.length; i++) {
    batchCount++;
    values.push(`(\$${i + 1}, \$${i + 2})`);
    parameters.push(users[i].id, users[i].name);

    if (batchCount === 500) {
      const query = sql + values.join(',');
      const res = await client.query(query, parameters);

      batchCount = 0;
      values = [];
      parameters = [];
    }
  }
}

await client.end();
