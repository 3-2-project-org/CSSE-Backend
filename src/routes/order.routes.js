import Express from "express";
import {
  createOerder,
  deleteOrder,
  getAllOrdersBySeller,
  getAllOrdersByUser,
  updateOrder,
} from "../controllers/order";
import { verifyAccessToken } from "../middleware/authentication";

const orderRouter = Express.Router();

orderRouter.get("/seller-orders/:id", verifyAccessToken, getAllOrdersBySeller);
orderRouter.get("/user-orders/:id", verifyAccessToken, getAllOrdersByUser);
orderRouter.post("/", verifyAccessToken,createOerder);
orderRouter.patch("/:id", verifyAccessToken, updateOrder);
orderRouter.delete("/:id", verifyAccessToken, deleteOrder);

export default orderRouter;
