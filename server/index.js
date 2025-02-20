const express = require("express");
const cors = require("cors");
const AppError = require("./utils/appErrors"); // msg , statusCode
const asyncHandler = require("./utils/asyncHandler");
const connectDB = require("./utils/DB");
const errorHandler = require("./utils/errorHandler");
const Todo = require("./models/todoModel");
require("dotenv").config();
const app = express();

connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// start of routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get(
  "/getTodos",
  asyncHandler(async (req, res) => {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  })
);
app.post(
  "/addTodo",
  asyncHandler(async (req, res) => {
    const { title } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    const todo = await Todo.create({ title, done: false });
    res.status(201).json(todo);
  })
);
app.put(
  "/updateTodo/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const todo = await Todo.findByIdAndUpdate(id, { title }, { new: true });
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }
    res.status(200).json({ todo });
  })
);
app.put(
  "/toggleDone/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }
    todo.done = !todo.done;
    await todo.save();
    res.status(200).json(todo);
  })
);

app.delete(
  "/deleteTodo/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      throw new AppError("Todo not found", 404);
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  })
);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
