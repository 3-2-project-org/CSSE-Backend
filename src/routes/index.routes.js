import Express from "express";
import authRouter from "./auth.routes";
import productRouter from "./product.routes";
import siteRouter from "./site.routes";

const router = Express.Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/site",siteRouter)

export default router;
