import orderModel from "../models/order";

export const createOrderRepositary = async (body, userId) => {
  const order = await orderModel.create({ ...body, buyerID: userId });
  return order;
};

export const getAllOrdersBySellerRepositary = async (sellerId) => {
  const orders = await orderModel
    .find({ sellerID: sellerId, is_active: true })
    .populate("products.productID")
    .populate("buyerID")
  return orders;
};

export const getAllOrdersByUserRepositary = async (userId) => {
  const orders = await orderModel
    .find({ buyerID: userId, is_active: true })
    .populate("products.productID")
    .populate("sellerID");
  return orders;
};

export const deleteOrderRepositary = async (orderId) => {
  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { is_active: false },
    { new: true }
  );
  return order;
};

export const findOrderById = async (orderId) => {
  const order = await orderModel.findById(orderId).populate("products.productID").populate("buyerID").populate("sellerID");
  return order;
};

export const updateOrderRepositary = async (orderId, body) => {
  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { ...body },
    { new: true }
  );
  return order;
};
