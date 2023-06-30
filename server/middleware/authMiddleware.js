import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the jwt from cookie
  // eslint-disable-next-line prefer-const
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized!, token failed!");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized! No token!");
  }
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin!");
  }
});

export { protect, admin };
