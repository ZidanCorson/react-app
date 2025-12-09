import { useEffect, useState } from "react";
import { cityCoordinates } from "../data/cities";

interface Props {
  city: string;
}

const LocalTimeClock = ({ city }: Props) => {
  const [time, setTime] = useState<Date>(new Date());
  const [timezone, setTimezone] = useState<string>("");
  const [isDay, setIsDay] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTimezone = async () => {
      const coords = cityCoordinates[city];
      if (!coords) return;
      
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current_weather=true&timezone=auto`
        );
        const data = await response.json();
        setTimezone(data.timezone);
        setIsDay(data.current_weather.is_day === 1);
      } catch (error) {
        console.error("Failed to fetch timezone", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimezone();
  }, [city]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading && !timezone) {
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

  if (!timezone) return null;

  const timeString = time.toLocaleTimeString("en-US", {
    timeZone: timezone,
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
            {isDay ? <i className="bi bi-sun-fill text-warning me-2"></i> : <i className="bi bi-moon-stars-fill text-primary me-2"></i>}
            {isDay ? "Daytime" : "Nighttime"}
        </div>
        <div className="text-muted mt-1" style={{fontSize: "0.7rem"}}>{timezone.replace("_", " ")}</div>
      </div>
    </div>
  );
};

export default LocalTimeClock;
