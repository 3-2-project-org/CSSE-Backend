import {
  getAllPaymentsRepositary,
  getPaymentByIdRepositary,
  makePaymentRepositary,
} from "../repositary/paymentRepositary";

export const makePaymentService = async (body) => {
  const response = await makePaymentRepositary(body);
  return response;
};

export const getAllPaymentsService = async (queries) => {
  const response = await getAllPaymentsRepositary(queries);
  return response;
};

export const getPaymentByIdService = async (id) => {
  const response = await getPaymentByIdRepositary(id);
  return response;
};
