import Express from "express";
import { addNewProduct, deleteExistingProduct, getAllProducts, getSingleProduct, getTotalProductCountBySeller, updateExistingProduct } from "../controllers/product";
import { verifyAccessToken } from "../middleware/authentication";

const productRouter = Express.Router();

productRouter.get("/", verifyAccessToken, getAllProducts);
productRouter.get("/count", verifyAccessToken, getTotalProductCountBySeller);
productRouter.get("/:id", verifyAccessToken, getSingleProduct);
productRouter.post("/", verifyAccessToken, addNewProduct);
productRouter.delete("/:id", verifyAccessToken, deleteExistingProduct);
productRouter.patch("/:id", verifyAccessToken, updateExistingProduct);

export default productRouter;
