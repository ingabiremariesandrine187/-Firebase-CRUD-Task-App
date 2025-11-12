"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Task } from "../types";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else {
        setUserEmail(user.email ?? "");
        const q = query(collection(db, "tasks"), where("userEmail", "==", user.email));
        onSnapshot(q, (snapshot) => {
          setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task)));
        });
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-black">
      <div className="w-full max-w-3xl bg-white border border-black rounded-3xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold">
            Hello, <span className="text-black">{userEmail}</span>
          </h2>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold bg-violet-800 px-4 py-2 rounded-xl shadow-md text-white hover:opacity-90 transition duration-200"
          >
            Logout
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-4">Add a new task</h3>
        <TaskForm userEmail={userEmail} />
        <h3 className="text-xl font-semibold mt-10 mb-4">Your Tasks</h3>
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
