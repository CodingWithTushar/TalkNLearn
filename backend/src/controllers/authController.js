import User from "../model/User.js";
import jwt from "jsonwebtoken";
import { UpsertStreamUser } from "../lib/stream.js";

export async function SignUp(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      res.status(400).json({
        message: "All fields are required.",
      });
    }

    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      res.status(400).json({
        message: "Email already exists.",
      });
    }

    const RandomNumber = Math.floor(Math.random() * 100) + 1;

    const avatarLink = `https://avatar.iran.liara.run/public/${RandomNumber}.png`;

    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailregex.test(email)) {
      res.status(400).json({
        message: "Invalid email format.",
      });
    }

    if (password.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    const user = await User.create({
      fullName: fullName,
      email: email,
      password: password,
      profilePic: avatarLink,
    });

    try {
      await UpsertStreamUser({
        id: user._id.toString(),
        name: user.fullName,
        email: user.email,
        image: user.profilePic || "",
      });

      console.log(`✅ Stream user created for: ${user.fullName}`);
    } catch (error) {
      console.log("⚠️ Stream user creation failed:", error);
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRECT_KEY,
      {
        expiresIn: "7d",
      }
    );

    if (!user.id) {
      res.status(400).json({
        message: "Error Happened While Creating a User!",
      });
    }

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      message: `Error Happened While Signing Up! ${e}`,
    });
  }
}
export async function LogIn(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({
        message: "All Fields are Required.",
      });
    }
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(401).json({
        message: "No user found with this email. Please sign up first.",
      });
    }

    const comparePassword = await user.matchPassword(password);

    if (!comparePassword) {
      res.status(400).json({
        message: "Incorrect password.",
      });
    }

    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRECT_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      message: `Server error during login: ${e.message}`,
    });
  }
}
export async function LogOut(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (e) {
    res.status(500).json({
      message: `Server error during logout: ${e.message}`,
    });
  }
}
export async function OnBoarding(req, res) {
  const userId = req.user;
  const { fullName, bio, nativeLanguage, learningLanguage, location } =
    req.body;
  try {
    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      res.status(400).json({
        message: "All fields are required.",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!user) {
      res.status(400).json({
        message: "User not found for onboarding update.",
      });
    }

    try {
      await UpsertStreamUser({
        id: user._id.toString(),
        name: user.fullName,
        image: user.profilePic || "",
      });

      console.log(`✅ Stream user updated: ${user.fullName}`);
    } catch (error) {
      console.error("⚠️ Stream update failed:", error);
    }

    res.json({
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      message: `Error Happened While OnBoarding! ${e}`,
    });
  }
}

export const GetCurrentUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "User data fetched successfully.",
    user: req.user,
  });
};
