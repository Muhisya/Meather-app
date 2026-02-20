import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(() => localStorage.getItem("weather_user"));
  const [city, setCity] = useState("Jakarta");

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
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-blue-500/30">
      <Navbar onSearch={setCity} onLogout={handleLogout} user={user} />

      <main className="relative pt-20 md:pt-0">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <Hero city={city} />
      </main>

      <footer className="py-10 text-center border-t border-white/5 bg-[#0a0a0a]">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
          &copy; 2026 Meather Intelligence • Built with React & Vite
        </p>
      </footer>
    </div>
  );
}

export default App;
