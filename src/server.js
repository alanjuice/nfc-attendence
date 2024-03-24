const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const logger = require("./utils/logger");

dotenv.config();
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const clientRouter = require("./routes/client");
const hostRouter = require("./routes/host");
const resetpassword = require("./routes/forgotpassword/reset-password");
const setnewpassword = require("./routes/forgotpassword/set-newpassword");
const forgotpassword = require("./routes/forgotpassword/forgot-password");

const PORT = process.env.PORT;

app.use(express.json());
app.use(logger);

app.use("/client", clientRouter);
app.use("/host", hostRouter);

app.get("/status", async (req, res) => {
  res.status(200).json({ status: "alive" });
});

app.post("/forgotpassword", forgotpassword);

app.get("/resetpassword/:type/:id/:token", resetpassword);

app.post("/resetpassword/:type/:id/:token", setnewpassword);

app.listen(PORT, () => {
  console.log("Server listening at port " + PORT);
});
