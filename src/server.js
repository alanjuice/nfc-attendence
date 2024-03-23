const express = require("express");
const dotenv = require("dotenv");

const logger = require("./utils/logger");

dotenv.config();
const app = express();

const clientRouter = require("./routes/client");
const PORT = process.env.PORT;

app.use(express.json());
app.use(logger);
app.use("/client", clientRouter);

app.get("/status", (req, res) => {
  res.status(200).json({ status: "alive" });
});

app.listen(PORT, () => {
  console.log("Server listening at port " + PORT);
});
