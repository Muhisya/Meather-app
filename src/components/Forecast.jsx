import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Forecast({ city = "Jakarta" }) {
  const [forecast, setForecast] = useState([]);
  const apiKey = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `/forecast?q=${city}&units=metric&appid=${apiKey}`
        );

        // keep only a few entries for preview
        setForecast(response.data.list.slice(0, 8));
      } catch (error) {
        console.error("Forecast fetch failed:", error);
      }
    };

    fetchForecast();
  }, [city, apiKey]);

  // simple icon helper
  const getWeatherIcon = (condition) => {
    if (condition.includes("Rain")) return "🌧";
    if (condition.includes("Cloud")) return "☁";
    if (condition.includes("Clear")) return "☀";
    return "🌤";
  };

  return (
    <section className="mt-10 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4">
        5-Day Forecast —
        <br />
        <span className="text-5xl ml-2 py-2 px-6 rounded">
          {city}!
        </span>
      </h2>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 px-3 mt-4">
        {forecast.map((item, index) => {
          const date = new Date(item.dt_txt);

          return (
            <div
              key={index}
              className="snap-center flex-shrink-0 min-w-[140px] bg-white/25 backdrop-blur-md rounded-xl p-4 text-center text-white shadow-md hover:scale-105 transition"
            >
              <p className="text-sm opacity-80">
                {date.toLocaleDateString()}
              </p>

              <div className="text-3xl my-2">
                {getWeatherIcon(item.weather[0].main)}
              </div>

              <p className="font-bold text-lg">
                {Math.round(item.main.temp)}°C
              </p>

              <p className="text-xs opacity-80 capitalize">
                {item.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
