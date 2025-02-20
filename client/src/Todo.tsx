import axios from "axios";
import { useState } from "react";
import { Input } from "./components/ui/input";

const Todo = ({ todo }: { todo: { _id: string; title: string; done: boolean } }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      axios.delete(`http://localhost:5000/deleteTodo/${id}`);
      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = (id: string) => {
    try {
      axios.put(`http://localhost:5000/toggleDone/${id}`);
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };
  const handleEdit = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEdit(!isEdit);
    if (isEdit) {
      try {
        axios.put(`http://localhost:5000/updateTodo/${id}`, { title });
        console.log("Todo edited successfully");
      } catch (error) {
        console.error("Error editing todo:", error);
      }
    } else return;
  };

  return (
    <div className="todo p-2 bg-white w-full md:w-[450px] lg:w-[600px] rounded-lg mt-2 flex justify-between items-center cursor-pointer" onClick={() => handleToggle(todo._id)}>
      {!isEdit ? <p className={`${todo.done ? "line-through " : ""} font-bold`}>{todo.title}</p> : <Input type="text" className="mr-2" value={title} onChange={(e) => setTitle(e.target.value)} />}
      <div className="flex gap-2">
        <button className="p-2 bg-slate-500 text-white rounded-lg flex items-center justify-center w-8" onClick={(e) => handleEdit(todo._id, e)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
            <g fill="#ffffff" style={{ mixBlendMode: "normal" }}>
              <g transform="scale(5.33333,5.33333)">
                <path d="M38.657,18.536l2.44,-2.44c2.534,-2.534 2.534,-6.658 0,-9.193c-1.227,-1.226 -2.858,-1.9 -4.597,-1.9c-1.739,0 -3.371,0.675 -4.597,1.901l-2.439,2.439zM27.343,11.464l-18.069,18.069c-0.385,0.385 -0.678,0.86 -0.848,1.375l-3.35,10.121c-0.179,0.538 -0.038,1.131 0.363,1.532c0.287,0.286 0.669,0.439 1.061,0.439c0.158,0 0.317,-0.025 0.472,-0.076l10.118,-3.351c0.517,-0.17 0.993,-0.463 1.378,-0.849l18.068,-18.068z"></path>
              </g>
            </g>
          </svg>
        </button>
        <button className="p-2 bg-red-500 text-white rounded-lg flex items-center justify-center w-8" onClick={(e) => handleDelete(todo._id, e)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
            <g fill="#ffffff" style={{ mixBlendMode: "normal" }}>
              <g transform="scale(8.53333,8.53333)">
                <path d="M14.98438,2.48633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v0.5h-5.5c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-1.48633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-1.48633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805h-5.5v-0.5c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM6,9l1.79297,15.23438c0.118,1.007 0.97037,1.76563 1.98438,1.76563h10.44531c1.014,0 1.86538,-0.75862 1.98438,-1.76562l1.79297,-15.23437z"></path>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Todo;
