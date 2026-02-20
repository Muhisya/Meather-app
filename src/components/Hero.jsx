import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Hero({ city }) {
  const apiKey = import.meta.env.VITE_WEATHER_KEY;
  const STORAGE_KEY = "lastCity";

  const [activeCity, setActiveCity] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return city || saved || "Jakarta";
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
    if (!activeCity || !apiKey) return;

    const controller = new AbortController();

    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        console.log(`Fetching weather for ${activeCity}...`);
        const res = await axios.get(
          `/weather?q=${activeCity}&units=metric&appid=${apiKey}`,
          { signal: controller.signal }
        );
        
        console.log("Weather data received:", res.data);
        setWeather(res.data);

        localStorage.setItem(STORAGE_KEY, activeCity);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Fetch error:", err);
          setError("City not found");
          setWeather(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    return () => controller.abort();
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
    return new Date((ts + tz) * 1000).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-[#0a0a0a] text-white">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-white/40 font-light tracking-widest uppercase text-xs">Analyzing Sky...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen w-full bg-[#0a0a0a] text-red-400 font-light tracking-wide px-10 text-center">
        {error === "City not found" ? `City "${activeCity}" not found` : error}
      </div>
    );

  if (!weather) return null;

  return (
    <section className="min-h-screen w-full flex justify-center items-center p-4 md:p-8 bg-[#0a0a0a]">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[3rem] bg-gradient-to-br from-white/10 to-white/[0.02] border mt-20  border-white/10 shadow-2xl">
        
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full"></div>

        <div className="relative z-10 p-8 md:p-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
                  {weather.sys.country}
                </span>
                <span className="text-white/20 text-xs font-mono">ID: {weather.id}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none">
                {weather.name}
              </h2>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <span className="text-8xl md:text-9xl font-black text-white leading-none tracking-tighter">
                {Math.round(weather.main.temp)}°
              </span>
              <p className="text-white/50 font-medium uppercase tracking-widest text-sm mt-2">
                {weather.weather[0].description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-16">
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">Humidity</p>
                <p className="text-3xl font-semibold text-white">{weather.main.humidity}%</p>
              </div>
              <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">Wind Speed</p>
                <p className="text-3xl font-semibold text-white">{weather.wind.speed} <span className="text-sm font-normal text-white/40">m/s</span></p>
              </div>
            </div>

            <div className="flex justify-center py-10 md:py-0">
              <div className="text-[12rem] leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-pulse">
                {icon(weather.weather[0].main)}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">Sunrise</p>
                  <p className="text-2xl font-semibold text-white">{time(weather.sys.sunrise, weather.timezone)}</p>
                </div>
                <div className="text-2xl opacity-50">🌅</div>
              </div>
              <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">Sunset</p>
                  <p className="text-2xl font-semibold text-white">{time(weather.sys.sunset, weather.timezone)}</p>
                </div>
                <div className="text-2xl opacity-50">🌇</div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-8 text-white/40 text-xs font-medium uppercase tracking-wider">
              <p>Feels Like <span className="text-white ml-1">{Math.round(weather.main.feels_like)}°</span></p>
              <p>Pressure <span className="text-white ml-1">{weather.main.pressure} hPa</span></p>
              <p>Visibility <span className="text-white ml-1">{(weather.visibility / 1000).toFixed(1)} km</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
