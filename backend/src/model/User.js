import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"]  ,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friend: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
            return next()
    }
    try {
        const salt = await bcrypt.genSalt(7);
        this.password = await bcrypt.hash(this.password , salt);
        next()
    } catch (e) {
        next(e)
    }
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
  const isPassword  = bcrypt.compare(enteredPassword , this.password)
  return isPassword;
}

const User = model("User", UserSchema);

export default User;
