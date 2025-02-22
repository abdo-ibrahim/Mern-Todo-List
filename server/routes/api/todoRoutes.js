const router = require("express").Router();
const express = require("express");
const { addTodo, deleteTodo, getTodos, toggleDone, updateTodo } = require("../../controllers/todoController");
const { protect } = require("../../controllers/authController");

const todoRouter = express.Router();

todoRouter.get("/", protect, getTodos);
todoRouter.post("/", protect, addTodo);
todoRouter.put("/updateTodo/:id", protect, updateTodo);
todoRouter.put("/toggleDone/:id", protect, toggleDone);
todoRouter.delete("/:id", protect, deleteTodo);

module.exports = todoRouter;
