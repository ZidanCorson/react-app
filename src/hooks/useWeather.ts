import { useState, useEffect } from "react";
import { cityCoordinates } from "../data/cities";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  isDay: number;
  timezone: string;
}

export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      const coords = cityCoordinates[city];
      if (!coords) return;

      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current_weather=true&timezone=auto`
        );
        const data = await response.json();
        setWeather({
          temperature: data.current_weather.temperature,
          weatherCode: data.current_weather.weathercode,
          isDay: data.current_weather.is_day,
          timezone: data.timezone,
        });
      } catch (err) {
        setError("Failed to load weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
};

export const getWeatherDescription = (code: number) => {
  if (code === 0) return { text: "Clear sky", icon: "bi-sun-fill text-warning" };
  if (code === 1) return { text: "Mainly clear", icon: "bi-sun text-warning" };
  if (code === 2) return { text: "Partly cloudy", icon: "bi-cloud-sun text-secondary" };
  if (code === 3) return { text: "Overcast", icon: "bi-cloud-fill text-secondary" };
  if (code >= 45 && code <= 48) return { text: "Foggy", icon: "bi-cloud-haze-fill text-secondary" };
  if (code >= 51 && code <= 67) return { text: "Rainy", icon: "bi-cloud-drizzle-fill text-primary" };
  if (code >= 71 && code <= 77) return { text: "Snowy", icon: "bi-snow text-info" };
  if (code >= 80 && code <= 82) return { text: "Rain showers", icon: "bi-cloud-rain-heavy-fill text-primary" };
  if (code >= 85 && code <= 86) return { text: "Snow showers", icon: "bi-snow text-info" };
  if (code >= 95) return { text: "Thunderstorm", icon: "bi-cloud-lightning-rain-fill text-dark" };
  return { text: "Unknown", icon: "bi-question-circle" };
};
