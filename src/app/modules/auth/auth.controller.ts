import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const accessToken = await AuthServices.loginUserIntoDB(req.body);

  res.cookie("accessToken", accessToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login succesfull.",
    data: {
      accessToken,
    },
  });
});

export const AuthControllers = {
  loginUser,
};
