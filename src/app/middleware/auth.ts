import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../modules/utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, "You are not authorized");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET_KEY as string
    ) as JwtPayload;

    const { email, role, iat } = decoded;

    const userData = await User.isUserExistsById(email);

    if (!userData) {
      throw new AppError(404, "Credential errors.");
    }
    if (userData.isDeleted) {
      throw new AppError(404, "This user is deleted.");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized.");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
