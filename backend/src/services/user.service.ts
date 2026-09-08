import User from "../models/user.js";
import type { CreateUserInput } from "../types/user.types.js";
import  bcrypt  from "bcrypt" ; 


export const getUsers = async () => {
  const users = await User.find();

  return users;
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUser = async (
  id: string,
  data: Partial<CreateUserInput>
) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 12);
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new Error("User not found");
  }

  return deletedUser;
};