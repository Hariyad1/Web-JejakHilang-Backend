const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("You are not authenticated");
  }
  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      console.log("Token verification error:", err);
      return res.status(403).json("Token is invalid");
    }
    if (data.role !== 'admin') {
      return res.status(403).json("You are not authorized");
    }
    next();
  });
};

module.exports = verifyAdmin; 