import Express from "express";
import { loginUser, registerUser, resetPassword } from "../controllers/auth";

const authRouter = Express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.patch("/reset-password", resetPassword)

export default authRouter;
