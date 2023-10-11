import taskModel from "../models/taskModel";

export const createTaskRepositary = async (body) => {
  const task = await taskModel.create(body);
  return task;
};

export const getAllTasksRepositary = async (queries) => {
  const { taskPriority, taskStatus, assignedTo, sort, page, limit } = queries;
  const query = {
    is_active: true,
  };
  if (taskPriority) query.taskPriority = taskPriority;
  if (taskStatus) query.taskStatus = taskStatus;
  if (assignedTo) query.assignedTo = assignedTo;

  let response = taskModel.find(query).populate("assignedTo", "createdBy");

  if (sort) {
    let sortList = sort.split(",").join(" ");
    response = response?.sort(sortList);
  } else {
    if (response.length > 0) response = response?.sort("createdAt");
  }

  const pages = Number(page) || 1;
  const limits = Number(limit) || 10;
  const skips = (pages - 1) * limits;
  response = response.skip(skips).limit(limits);

  const totalPages = Math.ceil((await response).length / limits);
  return {
    data: await response,
    total: await Product.countDocuments(queryparams),
    page: pages,
    limit: limits,
    no_pages: totalPages,
  };
};

export const getTaskByIdRepositary = async (id) => {
  const task = await taskModel.findById(id);
  return task;
};

export const updateTaskRepositary = async (id, body) => {
  const task = await taskModel.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
  );
  return task;
};

export const deleteTaskRepositary = async (id) => {
  const task = await taskModel.findByIdAndDelete(id);
  return task;
};
