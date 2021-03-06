import express, { json } from "express";

import pokemonRouter from "./routes/pokemon.js";
import swaggerRouter from "./routes/swagger.js";
import trainerRouter from "./routes/trainer.js";

import sqlite3 from "sqlite3";

var app = express();
var sqlite3_ = sqlite3.verbose();

const db = new sqlite3.Database("trainers.db");

db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS trainers (id INTEGER PRIMARY KEY AUTOINCREMENT, pseudo TEXT)");
  db.all("SELECT ID, PSEUDO FROM trainers", function (err, row) {
    if (err) {
      console.log(err);
    } else {
      if (row.length === 0) {
        var stmt = db.prepare(`INSERT INTO trainers VALUES (NULL,?)`);
        var obj = [{ pseudo: "Yrdna" }];
        for (var i in obj) {
          stmt.run(obj[i].pseudo);
        }
        stmt.finalize();
      } else {
        console.log("Table trainers already exists ");
      }
    }
  });

  db.run("CREATE TABLE IF NOT EXISTS catches (id INTEGER PRIMARY KEY AUTOINCREMENT,id_trainer TEXT,id_pokemon TEXT,count INT)");
  db.all("SELECT ID FROM catches", function (err, row) {
    if (err) {
      console.log(err);
    } else {
      if (row.length > 0) {
          console.log("Table catches already exists")
      } 
    }
  });
});

var allowlist = ["http://localhost:8080"];

app.use(express.json());
app.set("port", 3000);
app.listen(app.get("port"));
console.log("Server listening on port", app.get("port"));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  const origin = req.headers.origin;
  if (allowlist.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/api", swaggerRouter);

app.use("/api/pokemon", pokemonRouter);

app.use("/api/trainer",trainerRouter)