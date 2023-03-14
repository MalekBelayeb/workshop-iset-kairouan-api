const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // get token from header
  const bearerToken = req.headers["Authorization"];
  // Bearer token
  // example  :
  // Bearer sfhsfdqlsdjlfqksjfdqlsdkfjqskldjfkqsdjf
  const token = bearerToken.split(" ")[1];

  // verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ message: "invalid session , please login!" });

    req.role = decoded.role;
    req.userID = decoded.userID;

    next();
  });
};
