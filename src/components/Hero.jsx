import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Hero({ city = "Jakarta" }) {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    axios
      .get(`/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(res => setWeather(res.data))
      .catch(err => console.log(err));
  }, [city]);

  const getIcon = (main) => {
    if (main.includes("Rain")) return "🌧";
    if (main.includes("Cloud")) return "☁";
    if (main.includes("Clear")) return "☀";
    return "🌤";
  };

  if (!weather)
    return (
      <div className="flex justify-center items-center h-[50vh] text-white text-xl">
        Loading weather...
      </div>
    );

  return (
    <section className="flex justify-center items-center mt-16 mb-20">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl rounded-3xl p-16 w-full max-w-3xl text-center text-white">

        <h2 className="text-2xl opacity-80 mb-2 tracking-wide">
          {weather.name}
        </h2>
        <div className="text-7xl mb-2">
          {getIcon(weather.weather[0].main)}
        </div>
        <h1 className="text-7xl font-bold mb-2">
          {Math.round(weather.main.temp)}°C
        </h1>
        <p className="text-lg capitalize opacity-90">
          {weather.weather[0].description}
        </p>
        <div className="flex justify-center gap-8 mt-6 text-sm opacity-80">
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </section>
  );
}
