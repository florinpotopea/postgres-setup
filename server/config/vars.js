const path = require("path");

require("dotenv-safe").load({
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example")
});

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
  pg_port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE
};
