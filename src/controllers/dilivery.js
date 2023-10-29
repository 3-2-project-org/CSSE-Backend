import {
  createDiliveryService,
  deleteDeliveryService,
  getAllDeliveriesByUserService,
  getDeliveryByIdService,
  updateDiliveryService,
} from "../services/deliveryService";
import { makeResponse } from "../utils/response";

//Create Delivery controller

export const createDilivery = async (req, res) => {
  const userId = req?.user?._id;
  const response = await createDiliveryService(req.body, userId);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });

  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Delivery created successfully",
  });
};

//Get Delivery By User ID controller

export const getAllDeliveriesByUser = async (req, res) => {
  const userId = req.params.id;
  const response = await getAllDeliveriesByUserService(userId);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Deliveries fetched successfully",
  });
};

//Update Delivery controller

export const updateDilivery = async (req, res) => {
  const id = req.params.id;
  const response = await updateDiliveryService(id, req.body);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Delivery updated successfully",
  });
};

//Delete Delivery controller

export const deleteDelivery = async (req, res) => {
  const id = req.params.id;
  const response = await deleteDeliveryService(id);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Delivery deleted successfully",
  });
};

export const getDeliveryById = async (req, res) => {
  const id = req.params.id;
  const response = await getDeliveryByIdService(id);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Delivery fetched successfully",
  });
}