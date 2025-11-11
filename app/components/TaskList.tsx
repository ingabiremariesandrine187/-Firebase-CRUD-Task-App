"use client";
import {db} from "../firebase";
import {doc,deleteDoc,updateDoc} from "firebase/firestore";
import {Task} from "../types";

export default function TaskList({ tasks }: {tasks:Task[] }) {
    const toggleCompleted = async (task:Task) => {
        const ref = doc(db,"tasks",task.id);
        await updateDoc(ref, { completed: !task.completed});

    };
    const handleDelete = async (id:string) => {
        await deleteDoc (doc(db, "tasks",id));

        
    };

 return (
   <div className="space-y-4">

 {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white/20 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm sm:text-base"
        >
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-pink-200">Priority: {task.priority}</p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task)}
              />
              <span>Done</span>
            </label>
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-secondary px-2 py-1 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
   </div>

 );
}