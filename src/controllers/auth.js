import { authLogin, authRegister, resetPasswordService } from "../services/authServices.js";
import { makeResponse } from "../utils/response.js";
import { badRequest } from "../errors/badRequest.js";
import { generateAccessToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  const user = await authRegister(req.body);
  if (!user)
    return makeResponse({
      res,
      status: 500,
      message: "Registration failed...",
    });
  if (user.status) return makeResponse({ res, ...user });
  const { password, ...otherDetails } = user;
  const accessToken = await generateAccessToken(otherDetails);

  return makeResponse({
    res,
    status: 200,
    data: { otherDetails, token: accessToken },
    messsage: "User creation successfull...",
  });
};

export const loginUser = async (req, res) => {
  const user = await authLogin(req.body);
  if (!user)
    return makeResponse({ res, status: 400, message: "Login failed..." });
  if (user.status) return makeResponse({ res, ...user });
  const { password, ...otherDetails } = user._doc;
  const accessToken = await generateAccessToken(otherDetails);
  return makeResponse({
    res,
    status: 200,
    data: { otherDetails, token: accessToken },
    message: "User login successfull...",
  });
};

export const resetPassword = async (req, res) => {
  if (req?.body?.password !== req?.body?.confirmPassword)
    throw new badRequest("Password and confirm password does not match");
  const response = await resetPasswordService(req.body);
  if (!response)
    return makeResponse({
      response,
      status: 400,
      message: "Reset password process failed...",
    });
  if (response.status) return makeResponse({ res, ...response });
  const { password, ...otherDetails } = response._doc;
  return makeResponse({
    res,
    status: 200,
    data: otherDetails,
    message: "Reset password process successfull...",
  });
};
