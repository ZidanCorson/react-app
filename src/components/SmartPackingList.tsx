import { useEffect, useState } from "react";
import { cityCoordinates } from "../data/cities";

interface Props {
  city: string;
}

interface WeatherData {
  temperature: number;
  weatherCode: number;
}

const SmartPackingList = ({ city }: Props) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      const coords = cityCoordinates[city];
      if (!coords) return;

      setLoading(true);
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
        console.error("Failed to load weather for packing list");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading || !weather) return null;

  const getSuggestions = (temp: number, code: number) => {
    const items: string[] = [];

    // Temperature based
    if (temp > 25) items.push("Sunscreen", "Hat", "Sunglasses", "Shorts");
    else if (temp > 15) items.push("Light jacket", "T-shirts", "Comfortable shoes");
    else if (temp > 5) items.push("Jacket", "Sweater", "Long pants");
    else items.push("Heavy coat", "Scarf", "Gloves", "Thermal wear");

    // Weather condition based
    // Rain: 51-67, 80-82
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
      items.push("Umbrella", "Raincoat", "Waterproof shoes");
    }
    // Snow: 71-77, 85-86
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
      items.push("Snow boots", "Warm socks");
    }
    // Thunderstorm: 95-99
    if (code >= 95 && code <= 99) {
      items.push("Raincoat", "Surge protector");
    }
    // Clear sky: 0-1
    if (code <= 1 && temp > 10 && !items.includes("Sunglasses")) {
      items.push("Sunglasses");
    }

    return [...new Set(items)]; // Remove duplicates
  };

  const suggestions = getSuggestions(weather.temperature, weather.weatherCode);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-muted text-uppercase mb-3" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
          Smart Packing List
        </h5>
        <ul className="list-group list-group-flush">
          {suggestions.map((item, index) => (
            <li key={index} className="list-group-item px-0 py-1 d-flex align-items-center border-0">
              <i className="bi bi-check2-circle text-success me-2"></i>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SmartPackingList;
