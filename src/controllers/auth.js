import {
  authLogin,
  authRegister,
  resetPasswordService,
} from "../services/authServices.js";
import { makeResponse } from "../utils/response.js";
import { badRequest } from "../errors/badRequest.js";
import { generateAccessToken } from "../utils/jwt.js";
import userModel from "../models/user.js";


//Registering User controller

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

// Login User controller

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

//Password Reset controller

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

export const getAllUsers = async (req, res) => {
  const query = req.query;
  const { type } = query;
  console.log(query);
  const queries = {  };
  if (type) {
    queries.type = type;
  }
  const users = await userModel.find(queries);
  if (!users)
    return makeResponse({
      res,
      status: 400,
      message: "Failed to fetch users...",
    });
  return makeResponse({
    res,
    status: 200,
    data: users,
    message: "Users fetched successfully...",
  });
};

export const editUser = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  console.log(id);
  const response = await userModel.findByIdAndUpdate(id, req.body);
  if (!response)
    return makeResponse({
      res,
      status: 400,
      message: "Failed to edit user...",
    });
  return makeResponse({
    res,
    status: 200,
    data: response,
    message: "User edited successfully...",
  });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const response = await userModel.findById(id);
  if (!response)
    return makeResponse({
      res,
      status: 400,
      message: "Failed to fetch user...",
    });
  return makeResponse({
    res,
    status: 200,
    data: response,
    message: "User fetched successfully...",
  });
};
