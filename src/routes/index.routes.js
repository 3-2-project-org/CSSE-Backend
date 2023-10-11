import Express from "express";
import authRouter from "./auth.routes";
import productRouter from "./product.routes";
import orderRouter from "./order.routes";
import deliveryRouter from "./delivery.routes";

const router = Express.Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/delivery", deliveryRouter)

export default router;
