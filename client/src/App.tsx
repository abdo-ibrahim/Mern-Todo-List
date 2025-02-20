import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState<{ _id: string; title: string; done: boolean }[]>([]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getTodos");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Todo List App</h1>
        <CreateTodo />
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
          {todos.length > 0 ? (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <Todo key={todo._id} todo={todo} />
              ))}
            </ul>
          ) : (
            <p className="text-red-500 text-center">No todos found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
