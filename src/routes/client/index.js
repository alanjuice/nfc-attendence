const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const app = express.Router();
const pool = require("../../database/pool");

const clientSchema = Joi.object({
  id: Joi.string().required().max(24),
  name: Joi.string().required().max(64),
  password: Joi.string().required().max(64),
  email: Joi.string().required().max(32).email(),
});

app.post("/register", async (req, res) => {
  const { error } = clientSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.message });
  }
  const { name, id, email, password } = req.body;
  try {
    const idUsed = await pool.query("SELECT * FROM CLIENT WHERE ID=$1", [id]);
    console.log(idUsed);
    if (idUsed.rowCount > 0) {
      res.status(400).json({ msg: "id already exists" });
      return;
    }
    await pool.query("INSERT INTO CLIENT VALUES($1,$2,$3,$4)", [
      id,
      name,
      email,
      password,
    ]);
    console.log("Client created " + id);
    res.status(200).json({ msg: "client created" });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(400).json({ msg: "Something went wrong" });
  }
});

app.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    //check if client exist
    const clientDetails = await pool.query("SELECT * FROM CLIENT WHERE ID=$1", [
      id,
    ]);
    if (clientDetails.rowCount == 0) {
      res.status(400).json({ msg: "client doesn't exist" });
      return;
    }

    //check if password matches
    const details = clientDetails.rows[0];
    if (password != details.password) {
      res.status(400).json({ msg: "password is incorrect" });
      return;
    }

    //Generate token
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: details.id }, secretKey);
    res.set("Authorization", `Bearer ${token}`);
    res.status(200).json({ msg: "logged in" });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(400).json({ msg: "Something went wrong" });
  }
});

module.exports = app;