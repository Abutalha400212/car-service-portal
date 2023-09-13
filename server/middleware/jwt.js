const jwtToken = require("jsonwebtoken");

module.exports.verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  const token = authHeader.split(" ")[1];
  jwtToken.verify(token, process.env.JWT_ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    req.decoded = decoded;
    next();
  });
};

exports.signJwt = async (req, res) => {
  const user = req.body;
  const token = jwtToken.sign(user, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "5",
  });
  res.send({ token });
};
