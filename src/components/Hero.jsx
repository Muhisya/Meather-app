import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Hero({ city }) {
  const apiKey = import.meta.env.VITE_WEATHER_KEY;
  const STORAGE_KEY = "lastCity";

  const [activeCity, setActiveCity] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
      if (city) return city;
      return "Jakarta";
    } catch {
      return "Jakarta";
    }
  });

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (city && city !== activeCity) {
      setActiveCity(city);
    }
  }, [city]);

  useEffect(() => {
    if (activeCity) {
      localStorage.setItem(STORAGE_KEY, activeCity);
    }
  }, [activeCity]);

  useEffect(() => {
    if (!activeCity) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `/weather?q=${activeCity}&units=metric&appid=${apiKey}`
        );
        setWeather(res.data);
      } catch {
        setError("City not found");
        setWeather(null);
      }
      setLoading(false);
    };

    fetchWeather();
  }, [activeCity, apiKey]);

  const icon = (c = "") => {
    if (c.includes("Rain")) return "🌧️";
    if (c.includes("Cloud")) return "☁️";
    if (c.includes("Clear")) return "☀️";
    if (c.includes("Snow")) return "❄️";
    if (c.includes("Thunderstorm")) return "⛈️";
    return "🌤️";
  };

  const time = (ts, tz = 0) => {
    const d = new Date((ts + tz) * 1000);
    return d.toUTCString().slice(17, 22);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-white/50 text-xl animate-pulse">
        Fetching atmosphere...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-300 text-xl font-light">
        {error}
      </div>
    );

  return (
    <section className="min-h-screen w-full flex justify-center items-center px-6 text-white">
      <div className="w-full max-w-4xl backdrop-blur-3xl bg-white/10 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-10 md:p-16 transition-all duration-700 hover:bg-white/15">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            {weather.name}
          </h2>
          <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mb-3">
            City ID: {weather.id}
          </p>
          <div className="flex justify-center items-center gap-2 text-white/60 text-sm font-medium uppercase tracking-[0.2em]">
            <span>{weather.sys.country}</span>
            <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            <span>{weather.weather[0].main}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
          <div className="text-[10rem] leading-none drop-shadow-2xl animate-bounce-slow">
            {icon(weather.weather[0].main)}
          </div>

          <div className="text-center md:text-left">
            <div className="flex items-start justify-center md:justify-start">
              <h1 className="text-[7rem] md:text-[8rem] font-black tracking-tighter leading-none">
                {Math.round(weather.main.temp)}
              </h1>
              <span className="text-4xl md:text-5xl font-light mt-4">°C</span>
            </div>
            <p className="text-xl md:text-2xl font-light capitalize text-white/80 mt-2">
              Feels like {Math.round(weather.main.feels_like)}° • {weather.weather[0].description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors">
            <span className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Humidity</span>
            <div className="text-2xl font-semibold">
              {weather.main.humidity}<span className="text-sm ml-1 text-white/60">%</span>
            </div>
          </div>

          <div className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors">
            <span className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Wind Speed</span>
            <div className="text-2xl font-semibold">
              {weather.wind.speed}<span className="text-sm ml-1 text-white/60">m/s</span>
            </div>
          </div>

          <div className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors">
            <span className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Sunrise</span>
            <div className="text-2xl font-semibold leading-tight">
              {time(weather.sys.sunrise, weather.timezone)}
            </div>
          </div>

          <div className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors">
            <span className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Sunset</span>
            <div className="text-2xl font-semibold leading-tight">
              {time(weather.sys.sunset, weather.timezone)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
