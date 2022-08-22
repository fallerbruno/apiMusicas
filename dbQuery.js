const client = require('./db.js');

async function dbQuery(sql, params) {
    let result = await client.query(sql, params);
    return result.rows;
}
module.exports = dbQuery;