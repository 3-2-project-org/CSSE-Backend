import {
  createOrderRepositary,
  findOrderById,
  getAllOrdersBySellerRepositary,
  getAllOrdersByUserRepositary,
  updateOrderRepositary,
} from "../repositary/orderRepositary";
import { findProductById, updateProductQuantity } from "../repositary/productRepositary";

export const createOrderService = async (body, userId) => {
  if (body?.products?.length > 0) {
    for (let i = 0; i < body?.products?.length; i++) {
      const currProduct = await findProductById(body?.products[i]?.productId);
      if (currProduct?.stock < body?.products[i]?.quantity) {
        return { status: 400, message: "Product not found" };
      }
    }

    // body?.products?.foreach(async (product) => {
    //   const currProduct = await findProductById(product?.productId);
    //   if (currProduct?.stock < product?.quantity) {
    //     return { status: 400, message: "Product not found" };
    //   }
    // });
  }

  const order = await createOrderRepositary(body, userId);
  if (order) {
    for (let i = 0; i < order?.products?.length; i++) {
      await updateProductQuantity(order?.products[i]?.productID, body?.products[i]?.quantity);
    }

    // order?.products?.foreach(async (product) => {
    //   await updateProductQuantity(product?.productId, product?.quantity);
    // });
  }
  return order;
};

export const getAllOrdersBySellerService = async (sellerId) => {
  const orders = await getAllOrdersBySellerRepositary(sellerId);
  return orders;
};

export const getAllOrdersByUserService = async (userId) => {
  const orders = await getAllOrdersByUserRepositary(userId);
  return orders;
};

export const updateOrderService = async (orderId, body) => {
  const existingOrder = await findOrderById(orderId);
  if (!existingOrder) return { status: 400, message: "Order not found" };
  const order = await updateOrderRepositary(orderId, body);


  if (order && body?.status === "Cancelled") {

    for (let i = 0; i < order?.products?.length; i++) {
      await updateProductQuantity(order?.products[i]?.productID, -order?.products[i]?.quantity);
    }
    // order?.products?.foreach(async (product) => {
    //   await updateProductQuantity(product?.productId, -product?.quantity);
    // });
  }
  return order;
};

export const deleteOrderService = async (orderId, userId) => {
  const existingOrder = await findOrderById(orderId);
  if (!existingOrder) return { status: 400, message: "Order not found" };
  const order = await updateOrderRepositary(orderId, { is_active: false });

  if (existingOrder?.status === "Pending") {
    for (let i = 0; i < existingOrder?.products?.length; i++) {
      await updateProductQuantity(existingOrder?.products[i]?.productID, -existingOrder?.products[i]?.quantity);
    }
  }
  return order;
};

export const getOrderByIdService = async (orderId) => {
  const order = await findOrderById(orderId);
  return order;
}