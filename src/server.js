const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/status", (req, res) => {
  res.status(200).json({ status: "alive" });
});

app.listen(PORT, () => {
  console.log("Server listening at port " + PORT);
});
