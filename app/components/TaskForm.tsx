"use client";
import {useState} from "react";
import {db} from "../firebase";
import {addDoc,collection} from "firebase/firestore";

export default function TaskForm({ userEmail}:{ userEmail: string }) {
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");
    await addDoc(collection(db, "tasks"), {
      title,
      description,
      priority,
      completed: false,
      userEmail,
    });
     setTitle("");
    setDescription("");
  };

   return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-6">
      <input
        type="text"
        placeholder="Title"
        className="p-3 rounded-md text-gray-900"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="p-3 rounded-md text-gray-900"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="p-3 rounded-md text-gray-900"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button
        type="submit"
        className="bg-gradient-to-r from-primary to-secondary py-2 rounded-lg font-semibold hover:opacity-90"
      >
        Add Task
      </button>
    </form>
  );
}