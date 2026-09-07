import User from "../models/user.js";
import type { CreateUserInput } from "../types/user.types.js";

export const createUser = async (data: CreateUserInput) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  

  const user = await User.create(data);

  return user;
};