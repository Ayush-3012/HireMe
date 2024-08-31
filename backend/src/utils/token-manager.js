import jwt from "jsonwebtoken";

// export const createToken = (id, email, role, expiresIn) => {
//   const payload = { userId: id, userEmail: email, userRole: role };
//   const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

//   return token;
// };

// export const verifyToken = async (req, res, next) => {
//   const token = req.signedCookies[`${process.env.COOKIE_NAME}`];

//   if (!token || token.trim() === "")
//     return res.status(401).json({ message: "Token Not Received" });

//   return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
//     if (err) {
//       console.log(err.message);
//       return res.status(401).json({ message: "Invalid Token" });
//     } else {
//       const { userId, userEmail, userRole } = success;
//       // console.log(success);
//       req.userEmail = userEmail;
//       req.userId = userId;
//       req.userRole = userRole;
//       res.locals.jwtData = userId;
//       return next();
//     }
//   });
// };
