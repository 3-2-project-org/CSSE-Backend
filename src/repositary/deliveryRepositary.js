import diliveryModel from "../models/dilivery";

export const createDiliveryRepositary = async (body, userID) => {
  const delivery = await diliveryModel.create({
    ...body,
    sellerID: userID,
  });
  return delivery;
};

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

export const updateDiliveryRepositary = async (id, body) => {
  const deliveries = diliveryModel.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
  );
  return deliveries;
};

export const deleteDeliveryRepositary = async (id) => {
  const deliveries = diliveryModel.findByIdAndUpdate(
    id,
    { is_active: false },
    { new: true }
  );
  return deliveries;
};

export const getDeliveryByIdRepositary = async (id) => {
  const delivery = await diliveryModel
    .findById(id)
    .populate("order")
    .populate("buyer");
  return delivery;
};
