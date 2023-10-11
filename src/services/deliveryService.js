import {
  createDiliveryRepositary,
  deleteDeliveryRepositary,
  getAllDeliveriesByUserRepositary,
  getDeliveryByIdRepositary,
  updateDiliveryRepositary,
} from "../repositary/deliveryRepositary";
import { updateOrderRepositary } from "../repositary/orderRepositary";

export const createDiliveryService = async (body, userID) => {
  const delivery = await createDiliveryRepositary(body, userID);
  if (delivery) {
    await updateOrderRepositary(delivery.order, { status: "Delivered" });
  }
  return delivery;
};

export const getAllDeliveriesByUserService = async (userId) => {
  const deliveries = await getAllDeliveriesByUserRepositary(userId);
  return deliveries;
};

export const updateDiliveryService = async (id, body) => {
  const delivery = await updateDiliveryRepositary(id, body);
  return delivery;
};

export const deleteDeliveryService = async (id) => {
  const delivery = await deleteDeliveryRepositary(id);
  return delivery;
};

export const getDeliveryByIdService = async (id) => {
  const delivery = await getDeliveryByIdRepositary(id);
  return delivery;
}
