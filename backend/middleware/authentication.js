const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const authenticate = async (req, res, next) => {

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];


      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "12345");

      req.user = await User.findById(decoded.id).select("-password");
      //   req.user.id = decoded.id;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { authenticate };
