const jwt = require("jsonwebtoken");
const pool = require("../../database/pool");
const sendEmail = require("../../utils/sendEmail");

async function forgotpassword(req, res) {
  try {
    const { id, type } = req.body;
    //check if user exists
    const queryText = `SELECT * FROM ${type} WHERE id = $1`;
    const user = await pool.query(queryText, [id]);
    if (user.rowCount == 0) {
      res.status(400).json({ msg: "user doesn't exist" });
      return;
    }
    const userDetails = user.rows[0];
    const SECRET = process.env.SECRET_KEY + userDetails.id;
    const payload = {
      email: userDetails.email,
      id: userDetails.id,
    };

    const token = jwt.sign(payload, SECRET);
    console.log(token);
    const email = userDetails.email;
    const link =
      process.env.URL + `/resetpassword/${type}/${userDetails.id}/${token}`;
    sendEmail(email, link);
    res.status(200).json({ msg: "reset password link sent" });
  } catch (error) {
    console.log(error);
  }
}
module.exports = forgotpassword;
