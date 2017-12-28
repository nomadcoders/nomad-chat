"use strict";

const Koa = require("koa");
const logger = require("koa-logger");
const Router = require("koa-router");
const serve = require("koa-static");
const path = require("path");
const fs = require("fs");
const Message = require("./models");

const db = require("./db");
const app = new Koa();
const router = new Router();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

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

// Socket IO Stuff

io.on("connection", socket => {
  console.log("somebody connected!!");
  socket.on("login", msg => {
    socket.loggedIn = msg.loggedIn;
    socket.nickname = msg.nickname;
    console.log(socket.nickname, "just joined nomadchat!");
    const online = getConnected();
    io.emit("online change", { online });
  });

  socket.on("disconnect", socket => {
    console.log("somebody left!");
    const online = getConnected();
    io.emit("online change", { online });
  });

  socket.on("new message", msg => {
    // Create a new Message on the database
    console.log(msg);
  });
});

const getConnected = () => {
  const sockets = io.sockets.connected;
  const online = [];
  for (let socketID in sockets) {
    let socket = io.sockets.connected[socketID];
    if (socket.loggedIn)
      online.push({ nickname: socket.nickname, id: socketID });
  }
  return online;
};
