import {
  createTaskRepositary,
  deleteTaskRepositary,
  getAllTasksRepositary,
  getTaskByIdRepositary,
  updateTaskRepositary,
} from "../repositary/taskRepositary";
import { makeResponse } from "../utils/response";

export const createTaskService = async (body) => {
  const task = await createTaskRepositary(body);
  return task;
};

export const getAllTasksService = async (queries) => {
  const tasks = await getAllTasksRepositary(queries);
  return tasks;
};

export const getTaskByIdService = async (id) => {
  const task = await getTaskByIdRepositary(id);
  return task;
};

export const updateTaskService = async (id, body) => {
  const existingTask = await getTaskByIdRepositary(id);
  if (!existingTask)
    return makeResponse({
      res,
      statusCode: 400,
      message: "Task with given id not found",
    });
  const task = await updateTaskRepositary(id, body);
  return task;
};

export const deleteTaskService = async (id) => {
  const existingTask = await getTaskByIdRepositary(id);
  if (!existingTask)
    return makeResponse({
      res,
      statusCode: 400,
      message: "Task with given id not found",
    });
  const task = await deleteTaskRepositary(id);
  return task;
};
