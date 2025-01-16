import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer, role } = req.body;
    //validation
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }
    if (!answer) {
      return res.status(400).json({ message: "Answer is required" });
    }
    // if (!role) {
    //   return res.status(400).json({ message: "Role is required" });
    // }

    // If all validations pass

    //check if user already exists
    const ExistingUser = await userModel.findOne({ email });
    if (ExistingUser) {
      return res
        .status(200)
        .json({ success: false, message: "Already registered, please login" });
    }
    // register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      address,
      answer,
      phone,
      role,
    }).save();
    res
      .status(200)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error registering user",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, new_password } = req.body; // Corrected destructuring
    if (!email) {
      return res.status(400).send({
        message: "Email is required",
      });
    }
    if (!answer) {
      return res.status(400).send({
        message: "Answer is required",
      });
    }
    if (!new_password) {
      return res.status(400).send({
        message: "New Password is required",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({
      email,
      answer,
    });
    if (!user) {
      return res.status(404).send({
        message: "User Not Found!",
      });
    }
    if (!answer) {
      return res.status(404).send({
        message: "Incorrect Security Answer",
      });
    }

    // Update password
    const hashed = await hashPassword(new_password);
    await userModel.findByIdAndUpdate(user._id, {
      password: hashed,
    });

    res.status(200).send({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in forgot password",
      error,
    });
  }
};

export const gettokenController = async (req, res) => {
  const userId = req.user?.id; // Assuming the user is authenticated and you have their user ID

  if (!userId) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  // Retrieve the token from the database (use your actual DB query here)
  User.findById(userId)
    .then((user) => {
      if (user && user.token) {
        res.json({ user: user, token: user.token });
      } else {
        res.status(404).json({ message: "Token not found" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching user token", error: err });
    });
};

// test controller
export const testController = async (req, res) => {
  res.send("Protected route");
};
