import { useState, useEffect } from "react";

const Navbar = ({ onSearch }) => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const scrollListener = () => {
      setShow(window.scrollY > 80);
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-500 ${
        show
          ? "bg-white/20 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <h1 className="text-white font-bold text-2xl tracking-wide cursor-pointer">
        🌥️ Meather
      </h1>
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={handleSearchChange}
        className="bg-white/20 backdrop-blur-md text-white placeholder-white/70 border border-white/30 px-6 py-2 rounded-full outline-none focus:ring-2 focus:ring-white transition w-40 md:w-72"
      />
    </nav>
  );
};

export default Navbar;
