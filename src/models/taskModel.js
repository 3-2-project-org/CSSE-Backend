import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    taskStatus: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      default: "todo",
    },
    taskPriority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    taskDueDate: {
      type: Date,
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Task", taskSchema);
export default taskModel;
