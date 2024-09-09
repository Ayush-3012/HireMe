import jwt from "jsonwebtoken";

export const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  return token;
};

export const verifyToken = async (req, res, next) => {
  const token = req.signedCookies[`${process.env.COOKIE_NAME}`];

  if (!token || token.trim() === "")
    return res.status(401).json({ message: "Token Not Received" });

  return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
    if (err) return res.status(401).json({ message: "Invalid Token" });

    req.user = success;

    return next();
  });
};
