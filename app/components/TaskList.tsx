"use client";
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Task } from "../types";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const toggleCompleted = async (task: Task) => {
    const ref = doc(db, "tasks", task.id);
    await updateDoc(ref, { completed: !task.completed });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  if (tasks.length === 0) {
    return <p className="text-center text-gray-600">No tasks yet. Add one above!</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-5 rounded-2xl border border-black bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md ${
            task.completed ? "opacity-60" : ""
          }`}
        >
          <div>
            <h3
              className={`font-bold text-lg ${
                task.completed ? "line-through text-gray-500" : "text-black"
              }`}
            >
              {task.title}
            </h3>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm text-gray-600 mt-1">
              Priority: {task.priority}
            </p>
          </div>

          <div className="flex gap-2 mt-3 sm:mt-0">
            <label className="flex items-center gap-1 text-sm text-black">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task)}
                className="accent-purple-500"
              />
              <span>Done</span>
            </label>
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-gradient-to-r from-pink-600 to-purple-500 px-3 py-1 rounded-lg text-white text-sm shadow-md hover:opacity-90 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
