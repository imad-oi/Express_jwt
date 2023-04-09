const jwt = require("jsonwebtoken");

const checkTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      auth: false,
      message: "No token provided.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        auth: false,
        error: err,
        message: "Bad token : Failed to authenticate token.",
      });
    }
    // req.userId = decoded.id;
    next();
  });
};

module.exports = checkTokenMiddleware;
