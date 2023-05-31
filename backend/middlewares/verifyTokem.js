const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // check if there is token in the authorization header
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(403).json({ message: "Unauthorized. No token" });
  }

  // extract the token
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = verifyToken;
