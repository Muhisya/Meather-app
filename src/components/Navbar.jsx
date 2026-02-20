import { useEffect, useState, useRef } from "react";

const Navbar = ({ onSearch }) => {
  const STORAGE_KEY = "weatherHistory";
  const dropdownRef = useRef(null);

  const [showBg, setShowBg] = useState(false);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) setHistory(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBg(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submitSearch = () => {
    const city = query.trim();
    if (!city) return;

    onSearch?.(city);

    const updated = [city, ...history.filter(c => c !== city)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setShowHistory(false);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitSearch();
  };

  const chooseHistory = (city) => {
    onSearch?.(city);
    setShowHistory(false);
    setQuery("");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center transition-all duration-500 ${
        showBg
          ? "bg-black/10 backdrop-blur-2xl border-b border-white/10 py-4"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="text-3xl transition-transform group-hover:rotate-12 duration-300">🌥️</div>
        <h1 className="text-white font-black text-2xl tracking-tighter uppercase italic">
          Meathera
        </h1>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search The city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowHistory(true)}
            onKeyDown={handleKeyDown}
            className="bg-white/10 backdrop-blur-xl text-white placeholder-white/50 border border-white/20 px-6 py-2.5 rounded-2xl outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all w-48 md:w-80 text-sm font-medium"
          />
          <div className="absolute right-4 text-white/30 pointer-events-none">
            <svg xmlns="http://www.w3.org" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {showHistory && history.length > 0 && (
          <div className="absolute mt-3 w-full bg-[#121212]/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="px-4 py-2 text-[10px] font-bold text-white/30 uppercase tracking-widest border-b border-white/5">
              Recent Searches
            </div>
            {history.map((city) => (
              <button
                key={city}
                onClick={() => chooseHistory(city)}
                className="w-full text-left px-5 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <span className="text-white/20">🕒</span>
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
