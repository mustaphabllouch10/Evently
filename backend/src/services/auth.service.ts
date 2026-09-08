import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import type {
  RegisterInput,
  LoginInput,
} from "../types/auth.types.js";

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (data: LoginInput) => {
  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    user.password
  );


  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }


  const token = jwt.sign(
  { userId: user._id.toString() },
  process.env.JWT_SECRET!
  );

  const UserWithoutPassword = user.toObject() ;
  const { password , ...safeUser} = UserWithoutPassword; 
  return {
    user : safeUser , 
    token 
  };
};