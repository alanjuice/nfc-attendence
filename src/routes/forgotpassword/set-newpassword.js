const pool = require("../../database/pool");
const jwt = require("jsonwebtoken");

async function setnewpassword(req, res) {
  const { password } = req.body;
  console.log(req.body);
  const { token, id, type } = req.params;
  try {
    const SECRET = process.env.SECRET_KEY + id;
    const payload = jwt.verify(token, SECRET);
    const userId = payload.id;
    const queryText = `UPDATE ${type} SET password = $1 WHERE id = $2`;
    await pool.query(queryText, [password, id]);
    res.status(200).json({ msg: "reset password" });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
}

module.exports = setnewpassword;
