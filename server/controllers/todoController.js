const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appErrors");
const Todo = require("../models/todoModel");

exports.getTodos = asyncHandler(async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const todos = await Todo.find({ user: req.user._id }).select("-password");
    res.status(200).json({ status: "success", data: { todos } });
  } catch (error) {
    return next(new AppError("Error fetching todos", 500));
  }
});

exports.addTodo = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!req.user || !req.user._id) {
    return res.status(400).json({ error: "User not authenticated" });
  }
  const todo = await Todo.create({ title, done: false, user: req.user._id });
  res.status(201).json(todo);
});

exports.updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { title }, { new: true });
  if (!todo) {
    throw new AppError("Todo not found", 404);
  }
  res.status(200).json({ todo });
});

exports.toggleDone = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new AppError("Todo not found", 404);
  }
  todo.done = !todo.done;
  await todo.save();
  res.status(200).json(todo);
});

exports.deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) {
    throw new AppError("Todo not found", 404);
  }
  res.status(200).json({ message: "Todo deleted successfully" });
});
