"use client";
import {useEffect,useState} from "react";
import {auth,db} from "../firebase";
import {onAuthStateChanged,signOut} from "firebase/auth";
import {useRouter} from "next/navigation";
import {Task} from "../types";
import TaskForm from  "../components/TaskForm";
import TaskList from "../components/TaskList";
import {collection,query,where,onSnapshot} from "firebase/firestore";


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
          setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task)));
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
    <div className="w-full max-w-3xl bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-xl text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Hello, {userEmail}</h2>
        <button
          onClick={handleLogout}
          className="text-sm bg-gradient-to-r from-secondary to-primary px-3 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
      <TaskForm userEmail={userEmail} />
      <TaskList tasks={tasks} />
    </div>
  );
}