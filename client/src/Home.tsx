import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import api, { todoApi } from "./utils/api";
import axios from "axios";
import CreateTodo from "./components/CreateTodo";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState<{ _id: string; title: string; done: boolean }[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    document.title = "Todo List App";
  }, []);

  const fetchTodos = async () => {
    setLoading(true);

    try {
      const response = await api.get(todoApi);
      setTodos(response.data || []);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
      if (initialLoad) {
        setInitialLoad(false);
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Todo List App</h1>
        <CreateTodo fetchTodos={fetchTodos} />
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
          {loading && initialLoad ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              {todos.length > 0 ? (
                <ul className="space-y-3">
                  {todos.map((todo) => (
                    <Todo key={todo._id} todo={todo} fetchTodos={fetchTodos} />
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">No todos found. Add a new todo to get started!</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
