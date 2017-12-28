"use strict";

const Koa = require("koa");
const logger = require("koa-logger");
const Router = require("koa-router");
const db = require("./db");

const app = new Koa();
const router = new Router();
const server = require("http").createServer(app.callback());

app.use(logger());

app.use(router.routes());

router.get("/", async (ctx, next) => {
  ctx.body = "hello";
});

server.listen(8000);
console.log("Server running on the port 8000 ✅");
