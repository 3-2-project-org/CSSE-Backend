import Express from "express";
import authRouter from "./auth.routes";
import productRouter from "./product.routes";
import orderRouter from "./order.routes";

const router = Express.Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);

export default router;
