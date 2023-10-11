import {
  createOrderService,
  deleteOrderService,
  getAllOrdersBySellerService,
  getAllOrdersByUserService,
  updateOrderService,
} from "../services/orderService";
import { makeResponse } from "../utils/response";

export const createOerder = async (req, res) => {
  const userId = req?.user?._id;
  const response = await createOrderService(req.body, userId);

  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  // if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Order created successfully",
  });
};

export const getAllOrdersBySeller = async (req, res) => {
  const userId = req.params.id;
  const response = await getAllOrdersBySellerService(userId);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Orders fetched successfully",
  });
};

export const getAllOrdersByUser = async (req, res) => {
  const userId = req.params.id;
  const response = await getAllOrdersByUserService(userId);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Orders fetched successfully",
  });
};

export const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const response = await updateOrderService(orderId, req.body);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  // if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Order updated successfully",
  });
};

export const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  const response = await deleteOrderService(orderId);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  // if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Order deleted successfully",
  });
};
