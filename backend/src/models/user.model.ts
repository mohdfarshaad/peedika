import mongoose, { Schema } from "mongoose";
import { AccessTokenPayload, User, RefreshTokenPayload } from "../types/user";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config";

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    avatar: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: User, next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  this: User,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (this: User) {
  const payload: AccessTokenPayload = {
    _id: this._id,
    name: this.name,
    email: this.email,
  };

  const options: SignOptions = {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
  };

  return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, options);
};

userSchema.methods.generateRefreshToken = function (this: User) {
  const payload: RefreshTokenPayload = {
    _id: this._id,
  };

  const options: SignOptions = {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
  };

  return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, options);
};

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
