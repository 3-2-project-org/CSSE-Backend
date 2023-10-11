import Express from "express";
import authRouter from "./auth.routes";
import productRouter from "./product.routes";
import siteRouter from "./site.routes";
import orderRouter from "./order.routes";
import deliveryRouter from "./delivery.routes";
import taskRouter from "./task.routes";
import paymentRouter from "./payment.routes";

const router = Express.Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/site",siteRouter)
router.use("/order", orderRouter);
router.use("/delivery", deliveryRouter);
router.use("/task", taskRouter);
router.use("/payment", paymentRouter);

export default router;
