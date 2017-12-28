"use strict";

const Koa = require("koa");
const logger = require("koa-logger");
const db = require("./db");

const app = new Koa();
const server = require("http").createServer(app.callback());

app.use(logger());

server.listen(8000);
console.log("Server running on the port 8000 ✅");
