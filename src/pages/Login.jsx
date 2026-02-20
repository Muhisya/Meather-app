import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onLoginSuccess(email);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse delay-700"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-10 md:p-12 transition-all duration-500 hover:border-white/20"
        >
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-400 rounded-3xl rotate-12 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-4xl -rotate-12">🌤️</span>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-white text-4xl font-extrabold tracking-tight mb-3">
              Meather
            </h1>
            <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em]">
              Atmospheric Intelligence
            </p>
          </div>

          <div className="space-y-6">
            <div className="group relative">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/20 p-4 rounded-2xl outline-none transition-all duration-300 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <button
              type="submit"
              className="w-full group relative overflow-hidden bg-white text-black p-4 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              Real-time weather data <br /> 
              powered by openweathermap
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
