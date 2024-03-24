const jwt = require("jsonwebtoken");

function resetpassword(req, res) {
  const { token, id } = req.params;
  console.log(token, id);
  try {
    const SECRET = process.env.SECRET_KEY + id;
    console.log(SECRET);
    const payload = jwt.verify(token, SECRET);
    res.render("resetpassword");
  } catch (error) {
    console.log("Error,invalid url");
    res.render("error");
  }
}

module.exports = resetpassword;
