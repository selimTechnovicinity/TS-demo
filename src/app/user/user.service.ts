import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};
