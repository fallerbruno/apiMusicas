const pg = require('pg');
const client = new pg.Client({
    user: "postgres",
    password:"123456789",
    host: "localhost",
    port: 5432,
    database: "musicas"
});
client.connect();
module.exports = client;