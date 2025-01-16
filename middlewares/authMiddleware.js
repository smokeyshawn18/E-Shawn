import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// protected route token base

export const requireSignIn = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // 'Bearer <token>'
    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }

    // Verify the token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    next(); // Proceed to the next middleware if the user is admin
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
