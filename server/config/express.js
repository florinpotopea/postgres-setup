const express = require("express");
const morgan = require("morgan");
const { logs } = require("./vars");
const cors = require("cors");
const helmet = require("helmet");
const gigs = require("../routes/gigs");

const app = express();

app.use(morgan(logs));
app.use(express.json({ extended: false }));
app.use(cors());
app.use(helmet());

app.use(gigs);

module.exports = app;
