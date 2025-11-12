"use client";
import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function TaskForm({ userEmail }: { userEmail: string }) {
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 mb-8 bg-white p-5 rounded-2xl border border-black"
    >
      <input
        type="text"
        placeholder="Task Title"
        className="p-3 rounded-xl border border-black text-black focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-gray-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        className="p-3 rounded-xl border border-black text-black focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-gray-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="p-3 rounded-xl border border-black text-black focus:ring-2 focus:ring-purple-400 focus:outline-none"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition duration-200"
      >
        Add Task
      </button>
    </form>
  );
}
