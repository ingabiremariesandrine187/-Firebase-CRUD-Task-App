
"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-pink-400 p-6">
  <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Create Account</h2>
    <p className="text-gray-700 mb-6 text-center">Sign up with your email & password</p>

    <form onSubmit={handleRegister} className="flex flex-col gap-5">
      <input
        type="email"
        placeholder="Email"
        className="p-4 rounded-xl border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 focus:outline-none text-gray-900 placeholder-gray-500 text-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="p-4 rounded-xl border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 focus:outline-none text-gray-900 placeholder-gray-500 text-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-pink-400 text-white text-lg shadow-lg hover:opacity-95 transition duration-200"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      <p className="text-center text-gray-700 mt-4 text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-pink-500 underline font-medium"
        >
          Login
        </button>
      </p>
    </form>
  </div>
</div>

  );
}
