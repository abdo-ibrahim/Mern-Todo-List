import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import api, { todoApi } from "@/utils/api";
const CreateTodo = ({ fetchTodos }: { fetchTodos: () => void }) => {
  const [title, setTitle] = useState("");
  const handleTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await api.post(`${todoApi}`, { title });
      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  return (
    <form className="flex flex-wrap items-center gap-2 w-full" onSubmit={handleTodo}>
      <Input type="text" placeholder="Enter a todo..." className="p-3 text-lg border rounded-lg flex-1 min-w-[200px]" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button className="p-3 rounded-lg w-full sm:w-auto">Add Todo</Button>
    </form>
  );
};

export default CreateTodo;
