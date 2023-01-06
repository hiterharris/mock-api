const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const UsersRouter = require("./users/router.js");
const SitesRouter = require("./sites/router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Mock API");
});

server.use("/users", UsersRouter);
server.use("/sites", SitesRouter);

module.exports = server;
