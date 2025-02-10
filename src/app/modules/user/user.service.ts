import { JwtPayload } from "jsonwebtoken";
import AppError from "../../error/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  if (await User.findOne({ email: payload.email })) {
    throw new AppError(500, "User already exist with this email.");
  }
  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  if (!result) {
    throw new AppError(404, "User not found.");
  }
  return result;
};

const getSingleUserFromDB = async (user: JwtPayload, id: string) => {
  const result = await User.findById(id);

  if (result?.email !== user.email && user.role !== "admin") {
    throw new AppError(401, "Unauthorized.");
  }

  if (result?.isDeleted) {
    throw new AppError(404, "This User is no longer exists.");
  }

  if (!result) {
    throw new AppError(404, "User not found.");
  }

  return result;
};

const deleteUserFromDB = async (user: JwtPayload, id: string) => {
  await getSingleUserFromDB(user, id);

  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
