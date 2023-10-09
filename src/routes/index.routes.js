import Express from "express";
import authRouter from "./auth.routes";
import productRouter from "./product.routes";

const router = Express.Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);

export default router;
