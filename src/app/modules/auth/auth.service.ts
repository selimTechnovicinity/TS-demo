import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";
import { createToken } from "./auth.utils";

const loginUserIntoDB = async (payload: TLogin) => {
  const userData = await User.isUserExistsById(payload?.email);
  if (!userData) {
    throw new AppError(404, "Credential errors.");
  }
  if (userData.isDeleted) {
    throw new AppError(404, "This user is deleted.");
  }

  const isPasswordMatched = await User.isPasswordMatch(
    payload?.password,
    userData?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(403, "Credential errors. password not matched");
  }
  const jwtPayload = {
    userId: userData.email,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET_KEY as string,
    process.env.JWT_ACCESS_SECRET_KEY_EXPIRES_IN as string
  );

  return accessToken;
};

export const AuthServices = {
  loginUserIntoDB,
};
