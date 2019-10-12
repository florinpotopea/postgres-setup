const app = require("./config/express");
const { port, env } = require("./config/vars");

app.get("/", (req, res) => res.send("<h2>Aloha</h2>"));

app.listen(port, () => console.info(`Connected on port ${port}: (${env})`));
