import Express from "express";
import { verifyAccessToken } from "../middleware/authentication";
import {
  getAllPayments,
  getPaymentById,
  makePayment,
} from "../controllers/payment";

const paymentRouter = Express.Router();

paymentRouter.get("/", verifyAccessToken, getAllPayments);
paymentRouter.get("/:id", verifyAccessToken, getPaymentById);
paymentRouter.post("/", verifyAccessToken, makePayment);

export default paymentRouter;
