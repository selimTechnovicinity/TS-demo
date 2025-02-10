import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsById(id: string): Promise<TUser>;
  isPasswordMatch(
    plaintextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedAt: Date,
    jwtIssuedAt: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
