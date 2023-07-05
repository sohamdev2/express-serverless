const serverless = require("serverless-http");
const express = require("express");
const app = express();

const validator = require("./validator");
const { getUsers, addUser, deleteUser } = require("./users");

app.get("/", (req, res, next) => {
  getUsers()
    .then((users) => res.status(200).send(users))
    .catch((e) => res.status(500).json(e));
});

app.post("/", validator, (req, res, next) => {
  addUser(req.body.name)
    .then((user) => res.status(201).send(user))
    .catch((e) => res.status(500).json(e));
});

app.delete("/", validator, (req, res, next) => {
  deleteUser(req.body.name)
    .then(() => res.sendStatus(200))
    .catch((e) => res.status(500).json(e));
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
