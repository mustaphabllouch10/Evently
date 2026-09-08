import type { Request, Response } from "express";

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service.js";


export const getUsersController = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getUsers();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get users",
    });
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await getUserById(req.params.id as string);

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "User not found"
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to get user",
    });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await updateUser(
      req.params.id as string,
      req.body
    );

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "User not found"
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to update user",
    });
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteUser(req.params.id as string);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "User not found"
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};