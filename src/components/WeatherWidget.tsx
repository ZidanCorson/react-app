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

  if (loading) return <div className="text-center p-3 h-100 d-flex align-items-center justify-content-center">Loading weather...</div>;
  if (error) return <div className="text-center p-3 text-danger h-100 d-flex align-items-center justify-content-center">{error}</div>;
  if (!weather) return null;

  const getWeatherDescription = (code: number) => {
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

  const { text, icon } = getWeatherDescription(weather.weatherCode);

  return (
    <div className="weather-widget p-3 h-100 d-flex flex-column justify-content-center text-center rounded shadow-sm" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(5px)" }}>
      <h5 className="mb-0 text-muted text-uppercase" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>Current Weather</h5>
      <div className="d-flex flex-column justify-content-center align-items-center mt-2">
        <i className={`bi ${icon} mb-2`} style={{ fontSize: "2rem" }}></i>
        <span className="display-4 fw-bold text-dark" style={{ fontSize: "2.5rem" }}>{weather.temperature}°C</span>
        <span className="text-muted mt-1">{text}</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
