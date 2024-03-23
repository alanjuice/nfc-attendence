const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const app = express.Router();
const pool = require("../../database/pool");

const hostSchema = Joi.object({
  id: Joi.string().required().max(24),
  name: Joi.string().required().max(64),
  password: Joi.string().required().max(64),
  email: Joi.string().required().max(32).email(),
  course: Joi.string().required().max(12),
});

app.post("/register", async (req, res) => {
  const { error } = hostSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.message });
  }
  const { name, id, email, password, course } = req.body;
  try {
    const idUsed = await pool.query("SELECT * FROM HOST WHERE ID=$1", [id]);
    if (idUsed.rowCount > 0) {
      res.status(400).json({ msg: "id already exists" });
      return;
    }
    await pool.query("INSERT INTO HOST VALUES($1,$2,$3,$4,$5)", [
      id,
      name,
      email,
      password,
      course,
    ]);
    console.log("Host created " + id);
    res.status(200).json({ msg: "host created" });
  } catch (error) {
    console.error("Error creating host:", error);
    res.status(400).json({ msg: "Something went wrong" });
  }
});

app.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    //check if host exist
    const hostDetails = await pool.query("SELECT * FROM HOST WHERE ID=$1", [
      id,
    ]);
    if (hostDetails.rowCount == 0) {
      res.status(400).json({ msg: "host doesn't exist" });
      return;
    }

    //check if password matches
    const details = hostDetails.rows[0];
    if (password != details.password) {
      res.status(400).json({ msg: "password is incorrect" });
      return;
    }

    //Generate token
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: details.id }, secretKey);
    res.set("Authorization", `Bearer ${token}`);
    res.status(200).json({});
  } catch (error) {
    console.error("Error :", error);
    res.status(400).json({ msg: "Something went wrong" });
  }
});

module.exports = app;
