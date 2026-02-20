import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(() => localStorage.getItem("weather_user"));
  const [city, setCity] = useState(""); 
  const handleLoginSuccess = (email) => {
    localStorage.setItem("weather_user", email);
    setUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("weather_user");
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] selection:bg-blue-500/30 overflow-x-hidden text-white">
      <Navbar onSearch={setCity} onLogout={handleLogout} user={user} />
      <main className="relative pb-5 pt-2">
        <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[130px] rounded-full pointer-events-none opacity-50"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[130px] rounded-full pointer-events-none opacity-50"></div>
        
        <div className="relative z-10">
          <Hero city={city} />
        </div>
      </main>

      <footer className="py-10 text-center border-t border-white/5 bg-[#0B0E14] relative z-10">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
          &copy; 2026 Meather Intelligence • Built with React & Vite
        </p>
      </footer>
    </div>
  );
}

export default App;
