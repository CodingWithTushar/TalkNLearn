import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      res.status(401).json({
        message: "UnAuthorized : No Token provided!",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);

    if (!decoded) {
      res.status(401).json({
        message: "UnAuthorized : Invalid Token!",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(400).json({
        message: "UnAuthorized : User not Found!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error Happened While Authorizing The User ${error}`);
  }
};
