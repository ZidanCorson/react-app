import { useState, useEffect } from "react";
import { useWeather } from "../hooks/useWeather";

interface Props {
  city: string;
}

const SmartPackingList = ({ city }: Props) => {
  const { weather, loading } = useWeather(city);
  const [packedItems, setPackedItems] = useState<Set<string>>(new Set());

  // Load saved items when city changes
  useEffect(() => {
    const saved = localStorage.getItem(`packing-list-${city}`);
    if (saved) {
      try {
        setPackedItems(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse packed items", e);
        setPackedItems(new Set());
      }
    } else {
      setPackedItems(new Set());
    }
  }, [city]);

  // Save items whenever they change
  useEffect(() => {
    localStorage.setItem(`packing-list-${city}`, JSON.stringify([...packedItems]));
  }, [packedItems, city]);

  if (loading || !weather) return null;

  const getSuggestions = (temp: number, code: number) => {
    const items: string[] = [];

    // Temperature based
    if (temp > 25) items.push("Sunscreen", "Hat", "Sunglasses", "Shorts");
    else if (temp > 15) items.push("Light jacket", "T-shirts", "Comfortable shoes");
    else if (temp > 5) items.push("Jacket", "Sweater", "Long pants");
    else items.push("Heavy coat", "Scarf", "Gloves", "Thermal wear");

    // Weather condition based
    // Fog: 45-48
    if (code >= 45 && code <= 48) {
      items.push("Reflective gear", "Flashlight");
    }
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
  const progress = Math.round((packedItems.size / suggestions.length) * 100) || 0;

  const toggleItem = (item: string) => {
    const newPacked = new Set(packedItems);
    if (newPacked.has(item)) {
      newPacked.delete(item);
    } else {
      newPacked.add(item);
    }
    setPackedItems(newPacked);
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="card-title text-muted text-uppercase mb-1" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
              Smart Packing List
            </h5>
            <div className="progress" style={{ height: "6px", width: "120px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${progress}%`, transition: "width 0.3s ease" }}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
          <span className="badge bg-light text-dark border">
            {packedItems.size} / {suggestions.length}
          </span>
        </div>
        <ul className="list-group list-group-flush">
          {suggestions.map((item, index) => {
            const isPacked = packedItems.has(item);
            return (
              <li
                key={index}
                className="list-group-item px-0 py-2 d-flex align-items-center border-0"
                onClick={() => toggleItem(item)}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                <i
                  className={`bi ${
                    isPacked ? "bi-check-circle-fill text-success" : "bi-circle text-secondary"
                  } me-2 fs-5`}
                ></i>
                <span className={isPacked ? "text-decoration-line-through text-muted" : ""}>
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SmartPackingList;
