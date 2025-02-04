import AppError from "../../error/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  if (!result) {
    throw new AppError(404, "User not found.");
  }
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);

  if (!result) {
    throw new AppError(404, "User not found.");
  }

  return result;
};

const deleteUserFromDB = async (id: string) => {
  await getSingleUserFromDB(id);

  const result = await User.findByIdAndDelete(id);

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB
};
