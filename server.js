"use strict";

const Koa = require("koa");
const logger = require("koa-logger");
const Router = require("koa-router");
const serve = require("koa-static");
const path = require("path");
const fs = require("fs");

const db = require("./db");
const app = new Koa();
const router = new Router();
const server = require("http").createServer(app.callback());

app.use(logger());

app.use(router.routes());

app.use(serve(__dirname + "/frontend/build/"));

router.get("/", async (ctx, next) => {
  ctx.type = "html";
  ctx.body = fs.createReadStream(
    path.join(__dirname, "/frontend/build/index.html")
  );
});

server.listen(8000);
console.log("Server running on the port 8000 ✅");
