// src/middleware/authenticate.js
const authenticate = (req, res, next) => {
  // your authentication logic here
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export default authenticate;
