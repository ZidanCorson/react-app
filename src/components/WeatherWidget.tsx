import { useEffect, useState } from "react";
import { cityCoordinates } from "../data/cities";

interface Props {
  city: string;
}

interface WeatherData {
  temperature: number;
  weatherCode: number;
}

const WeatherWidget = ({ city }: Props) => {
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
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current_weather=true`
        );
        const data = await response.json();
        setWeather({
          temperature: data.current_weather.temperature,
          weatherCode: data.current_weather.weathercode,
        });
      } catch (err) {
        setError("Failed to load weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <div className="text-center p-3">Loading weather...</div>;
  if (error) return <div className="text-center p-3 text-danger">{error}</div>;
  if (!weather) return null;

  return (
    <div className="weather-widget p-3 mb-4 text-center rounded shadow-sm" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(5px)" }}>
      <h5 className="mb-0 text-muted text-uppercase" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>Current Weather</h5>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <span className="display-4 fw-bold text-dark">{weather.temperature}°C</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
