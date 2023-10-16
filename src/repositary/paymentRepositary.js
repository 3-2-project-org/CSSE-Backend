import paymentModel from "../models/payment";


//make payment
export const makePaymentRepositary = async (body) => {
  const response = await paymentModel.create(body);
  return response;
};


//get all payment
export const getAllPaymentsRepositary = async (queries) => {
  const { page, limit, paymentMethod, paymentStatus } = queries;
  const query = {
    is_active: true,
  };

  if (paymentMethod) queries.paymentMethod = paymentMethod;
  if (paymentStatus) queries.paymentStatus = paymentStatus;

  const response = paymentModel.find(query).populate("orderID");

  const pages = Number(page) || 1;
  const limits = Number(limit) || 10;
  const skips = (pages - 1) * limits;
  response = response.skip(skips).limit(limits);
  return {
    data: await response,
    total: await Product.countDocuments(queryparams),
    page: pages,
    limit: limits,
  };
};

//get payment by ID

export const getPaymentByIdRepositary = async (id) => {
  const response = await paymentModel.findById(id).populate("orderID");
  return response;
};
