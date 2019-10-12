const { pg_port, database, user, password, host } = require("./vars");

const pg = require("pg");

const config = {
  user,
  database,
  password,
  port: pg_port
};

const pool = new pg.Pool(config);

module.exports = pool;
