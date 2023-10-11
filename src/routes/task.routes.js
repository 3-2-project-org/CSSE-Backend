import Express from "express";
import { verifyAccessToken } from "../middleware/authentication";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task";

const taskRouter = Express.Router();

taskRouter.get("/", verifyAccessToken, getAllTasks);
taskRouter.get("/:id", verifyAccessToken, getTaskById);
taskRouter.post("/", verifyAccessToken, createTask);
taskRouter.patch("/:id", verifyAccessToken, updateTask);
taskRouter.delete("/:id", verifyAccessToken, deleteTask);

export default taskRouter;
