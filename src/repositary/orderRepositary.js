import orderModel from "../models/order";

//Create Order
export const createOrderRepositary = async (body, userId) => {
  const order = await orderModel.create({ ...body, buyerID: userId });
  return order;
};

//Get all orders
export const getAllOrdersBySellerRepositary = async (sellerId) => {
  const orders = await orderModel
    .find({ sellerID: sellerId, is_active: true })
    .populate("products.productID")
    .populate("buyerID")
  return orders;
};


//Get all orders by user
export const getAllOrdersByUserRepositary = async (userId) => {
  const orders = await orderModel
    .find({ buyerID: userId, is_active: true })
    .populate("products.productID")
    .populate("sellerID");
  return orders;
};

//delete order
export const deleteOrderRepositary = async (orderId) => {
  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { is_active: false },
    { new: true }
  );
  return order;
};

//Find Order by ID
export const findOrderById = async (orderId) => {
  const order = await orderModel.findById(orderId).populate("products.productID").populate("buyerID").populate("sellerID");
  return order;
};


//Update order
export const updateOrderRepositary = async (orderId, body) => {
  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { ...body },
    { new: true }
  );
  return order;
};
