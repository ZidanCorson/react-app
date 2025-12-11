import { useEffect, useState } from "react";
import { useWeather } from "../hooks/useWeather";

interface Props {
  city: string;
}

const LocalTimeClock = ({ city }: Props) => {
  const [time, setTime] = useState<Date>(new Date());
  const { weather, loading } = useWeather(city);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading && !weather) {
    return (
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex align-items-center justify-content-center">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const timeString = time.toLocaleTimeString("en-US", {
    timeZone: weather.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body text-center d-flex flex-column justify-content-center">
        <h5 className="text-muted text-uppercase small mb-0" style={{ letterSpacing: "1px" }}>Local Time</h5>
        <div className="fs-2 fw-bold my-2 text-dark">{timeString}</div>
        <div className="text-muted small">
            {weather.isDay ? <i className="bi bi-sun-fill text-warning me-2"></i> : <i className="bi bi-moon-stars-fill text-primary me-2"></i>}
            {weather.isDay ? "Daytime" : "Nighttime"}
        </div>
        <div className="text-muted mt-1" style={{fontSize: "0.7rem"}}>{weather.timezone.replace("_", " ")}</div>
      </div>
    </div>
  );
};

export default LocalTimeClock;
