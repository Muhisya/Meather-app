import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onLoginSuccess(email);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl rounded-2xl p-10 w-96"
      >
        <h1 className="text-white text-3xl font-bold mb-2 text-center">
          Weather Login
        </h1>

        <p className="text-white/80 text-sm mb-8 text-center">
          Sign in to check today’s forecast
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-6 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className="w-full bg-white text-blue-600 p-3 rounded-lg font-bold hover:bg-blue-100 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
