import axios from "axios";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useState } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const handleTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post("http://localhost:5000/addTodo", { title });
      setTitle("");
    } catch (err) {
      console.error("Error adding todo:", err);
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
