const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isAuthAdmin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // take token from header
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id });
    
    if (user.role!='admin') {
      return res.status(405).json({ error: "Not allow do this action" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Request in not authorized" });
  }
};

module.exports = {isAuthAdmin}
