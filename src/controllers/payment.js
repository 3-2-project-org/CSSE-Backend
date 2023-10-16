import { getAllPaymentsService, getPaymentByIdService, makePaymentService } from "../services/paymentServices";
import { makeResponse } from "../utils/response";


// Make Payment Controller

export const makePayment = async (req, res) => {
  const response = await makePaymentService(req.body);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });

  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Payment done successfully",
  });
};

//Get All payments Controller

export const getAllPayments = async (req, res) => {
  const response = await getAllPaymentsService(req.query);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Payments fetched successfully",
  });
};


//Get Payment by ID

export const getPaymentById = async (req, res) => {
  const response = await getPaymentByIdService(req.params.id);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Payment fetched successfully",
  });
};
