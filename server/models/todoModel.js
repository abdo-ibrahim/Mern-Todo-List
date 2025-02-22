const mongoose = require("mongoose");
const User = require("./userModel");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    done: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Todo must belong to a user"],
    },
  },
  { timestamps: true }
);

todoSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "userName firstName lastName",
  });
  next();
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
