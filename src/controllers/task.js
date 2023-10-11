import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
} from "../services/taskServices";
import { makeResponse } from "../utils/response";

export const createTask = async (req, res) => {
  const response = await createTaskService(req.body);
  if (!response) makeResponse({ res, statusCode: 400, message: "Bad Request" });
  makeResponse({
    res,
    statusCode: 201,
    message: "Task Created",
    data: response,
  });
};

export const getAllTasks = async (req, res) => {
  const queries = req.query;
  const response = await getAllTasksService(queries);
  if (!response) makeResponse({ res, statusCode: 400, message: "Bad Request" });
  makeResponse({
    res,
    statusCode: 200,
    message: "Tasks Fetched",
    data: response,
  });
};

export const getTaskById = async (req, res) => {
  const response = await getTaskByIdService(req.params.id);
  if (!response) makeResponse({ res, statusCode: 400, message: "Bad Request" });
  makeResponse({
    res,
    statusCode: 200,
    message: "Task Fetched",
    data: response,
  });
};

export const updateTask = async (req, res) => {
  const response = await updateTaskService(req.params.id, req.body);
  if (!response) makeResponse({ res, statusCode: 400, message: "Bad Request" });
  makeResponse({
    res,
    statusCode: 200,
    message: "Task Updated",
    data: response,
  });
};

export const deleteTask = async (req, res) => {
  const response = await deleteTaskService(req.params.id);
  if (!response) makeResponse({ res, statusCode: 400, message: "Bad Request" });
  makeResponse({
    res,
    statusCode: 200,
    message: "Task Deleted",
    data: response,
  });
};
