import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Forecast from "./components/Forecast";

function App() {
  const [city, setCity] = useState("Jakarta");

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
      <Navbar onSearch={setCity} />

      <main className="pt-24 px-6">
        <Hero city={city} />
        {/* <Forecast city={city} /> */}
      </main>
    </div>
  );
}

export default App;
