"use strict";

const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/echo", (req, res) => {
  const name = req.query["name"];
  res.send(`Hello ${name}!`);
});

app.post("/echo", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  res.send(`Hello ${name}!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
