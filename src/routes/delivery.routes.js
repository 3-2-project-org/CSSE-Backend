import Express from "express";
import {
  createDilivery,
  deleteDelivery,
  getAllDeliveriesByUser,
  getDeliveryById,
  updateDilivery,
} from "../controllers/dilivery";
import { verifyAccessToken } from "../middleware/authentication";

const deliveryRouter = Express.Router();

deliveryRouter.get("/", verifyAccessToken, getAllDeliveriesByUser);
deliveryRouter.get("/:id", verifyAccessToken, getDeliveryById);
deliveryRouter.post("/", verifyAccessToken, createDilivery);
deliveryRouter.patch("/:id", verifyAccessToken, updateDilivery);
deliveryRouter.delete("/:id", verifyAccessToken, deleteDelivery);

export default deliveryRouter;
