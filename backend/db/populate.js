const pool = require('./db');

const test = pool.query('SELECT NOW()');

test.then((res) => {
    console.log(res.rows[0].now);
});