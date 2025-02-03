import { Model } from "mongoose";

export type TUser = {
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
