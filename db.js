"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/nomadchat", { useMongoClient: true });

const db = mongoose.connection;

db.on("error", () => console.log("DB connection error ❌"));
db.once("open", () => console.log("DB connection success ✅"));

exports.db = db;
