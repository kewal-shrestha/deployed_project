// controllers/taskController.js
const mongoose = require("mongoose");
const Task = require("../models/taskModel");
const errorResponse = require("../utils/errorResponse");
const taskValidation = require("../validations/taskValidation");

exports.createTask = async (req, res) => {
  const { error } = taskValidation.createTaskSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);

  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    errorResponse(res, 500, "Server error");
  }
};

exports.getAllTasks = async (req, res) => {
  // const defaultLimit = 5;
  const {
    page = 1,
    defaultLimitlimit = 5,
    sortBy = "createdAt",
    order = "desc",
    status,
  } = req.query;

  const filter = {};
  if (status) filter.status = status;

  const sortOrder = order === "asc" ? 1 : -1;
  const safeLimit = Math.min(parseInt(defaultLimit), 100);

  try {
    const tasks = await Task.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * safeLimit)
      .limit(safeLimit);

    const total = await Task.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / safeLimit),
      tasks,
    });
  } catch (err) {
    errorResponse(res, 500, "Server error");
  }
};

//gets task by id
exports.getTaskById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return errorResponse(res, 400, "Invalid Task ID");
  }

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return errorResponse(res, 404, "Task not found");
    res.json(task);
  } catch (err) {
    errorResponse(res, 500, "Server error");
  }
};

exports.updateTask = async (req, res) => {
  const { error } = taskValidation.updateTaskSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return errorResponse(res, 400, "Invalid Task ID");
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return errorResponse(res, 404, "Task not found");
    res.json(task);
  } catch (err) {
    errorResponse(res, 500, "Server error");
  }
};

exports.deleteTask = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return errorResponse(res, 400, "Invalid Task ID");
  }

  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return errorResponse(res, 404, "Task not found");
    res.json({ message: "Task deleted" });
  } catch (err) {
    errorResponse(res, 500, "Server error");
  }
};

exports.updateStatus = async (req, res) => {
  const { error } = updateStatusSchema.validate(req.body);
  if (error) return errorResponse(res, 400, error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return errorResponse(res, 400, "Invalid Task ID");
  }

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!task) return errorResponse(res, 404, "Task not found");
    res.json(task);
  } catch (err) {
    errorResponse(res, 500, "Server error");
  }
};
