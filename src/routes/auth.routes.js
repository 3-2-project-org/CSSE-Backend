import Express from "express";
import { editUser, getAllUsers, getUserById, loginUser, registerUser, resetPassword } from "../controllers/auth";

const authRouter = Express.Router();


authRouter.get("/allusers", getAllUsers)
authRouter.get("/user/:id", getUserById)
authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.patch("/reset-password", resetPassword)
authRouter.patch("/edit/:id", editUser)

export default authRouter;
