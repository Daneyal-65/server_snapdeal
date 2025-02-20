const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token
  //   console.log("Received Token:", token);

  jwt.verify(token, "auth", (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid or expired token" });
    }

    req.body.id = decoded.id;
    next();
  });
};

module.exports = authentication;
