import diliveryModel from "../models/dilivery";

//Repository fucntions of delivery service

//Create delivery
export const createDiliveryRepositary = async (body, userID) => {
  const delivery = await diliveryModel.create({
    ...body,
    sellerID: userID,
  });
  return delivery;
};

// Get all deliveries

export const getAllDeliveriesByUserRepositary = async (userId) => {
  const deliveries = await diliveryModel
    .find({
      seller: userId,
      is_active: true,
    })
    .populate("order")
    .populate("buyer");
  return deliveries;
};

//Update delivery
export const updateDiliveryRepositary = async (id, body) => {
  const deliveries = diliveryModel.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
  );
  return deliveries;
};

//Delete Delivery
export const deleteDeliveryRepositary = async (id) => {
  const deliveries = diliveryModel.findByIdAndUpdate(
    id,
    { is_active: false },
    { new: true }
  );
  return deliveries;
};


//Get delivery by ID
export const getDeliveryByIdRepositary = async (id) => {
  const delivery = await diliveryModel
    .findById(id)
    .populate("order")
    .populate("buyer");
  return delivery;
};
