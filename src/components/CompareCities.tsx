import { useWeather, getWeatherDescription } from "../hooks/useWeather";
import { cityImages, cityCostMultipliers, cityCurrencies, cityLanguages, cityItineraries, cityCuisine } from "../data/cities";
import Button from "./Button";

interface Props {
  city1: string;
  city2: string;
  onBack: () => void;
}

const CompareCities = ({ city1, city2, onBack }: Props) => {
  const weather1 = useWeather(city1);
  const weather2 = useWeather(city2);

  const getCost = (city: string) => {
    const baseRate = 150; // Standard base rate
    const multiplier = cityCostMultipliers[city] || 1;
    return Math.round(baseRate * multiplier);
  };

  const getWeatherDisplay = (weatherData: typeof weather1) => {
    if (weatherData.loading) return "Loading...";
    if (weatherData.error || !weatherData.weather) return "N/A";
    const { text } = getWeatherDescription(weatherData.weather.weatherCode);
    return `${Math.round(weatherData.weather.temperature)}°C, ${text}`;
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button color="secondary" onClick={onBack}>
          <i className="bi bi-arrow-left me-2"></i>Back to List
        </Button>
        <h2 className="text-white text-shadow">Compare Destinations</h2>
        <div style={{ width: "100px" }}></div> {/* Spacer */}
      </div>

      <div className="row g-4">
        {/* City 1 */}
        <div className="col-md-6">
          <div className="card h-100 shadow-lg border-0">
            <div className="position-relative" style={{ height: "250px" }}>
              <img 
                src={cityImages[city1]?.[0]} 
                className="card-img-top h-100 w-100 object-fit-cover" 
                alt={city1} 
              />
              <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-dark text-white">
                <h3 className="mb-0">{city1}</h3>
              </div>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold"><i className="bi bi-cloud-sun me-2 text-primary"></i>Weather</span>
                  <span>{getWeatherDisplay(weather1)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold"><i className="bi bi-cash-coin me-2 text-success"></i>Est. Daily Cost</span>
                  <span>${getCost(city1)} / day</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold"><i className="bi bi-translate me-2 text-info"></i>Language</span>
                  <span>{cityLanguages[city1]}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold"><i className="bi bi-currency-exchange me-2 text-warning"></i>Currency</span>
                  <span>{cityCurrencies[city1]?.code} ({cityCurrencies[city1]?.symbol})</span>
                </li>
                <li className="list-group-item">
                  <div className="fw-bold mb-1"><i className="bi bi-star me-2 text-warning"></i>Top Attraction</div>
                  <small>{cityItineraries[city1]?.[0]?.activities[0]}</small>
                </li>
                <li className="list-group-item">
                  <div className="fw-bold mb-1"><i className="bi bi-egg-fried me-2 text-danger"></i>Must Try Food</div>
                  <small>{cityCuisine[city1]?.[0]?.dish}</small>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* City 2 */}
        <div className="col-md-6">
          <div className="card h-100 shadow-lg border-0">
            <div className="position-relative" style={{ height: "250px" }}>
              <img 
                src={cityImages[city2]?.[0]} 
                className="card-img-top h-100 w-100 object-fit-cover" 
                alt={city2} 
              />
              <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-dark text-white">
                <h3 className="mb-0">{city2}</h3>
              </div>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold"><i className="bi bi-cloud-sun me-2 text-primary"></i>Weather</span>
                  <span>{getWeatherDisplay(weather2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold"><i className="bi bi-cash-coin me-2 text-success"></i>Est. Daily Cost</span>
                  <span>${getCost(city2)} / day</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold"><i className="bi bi-translate me-2 text-info"></i>Language</span>
                  <span>{cityLanguages[city2]}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold"><i className="bi bi-currency-exchange me-2 text-warning"></i>Currency</span>
                  <span>{cityCurrencies[city2]?.code} ({cityCurrencies[city2]?.symbol})</span>
                </li>
                <li className="list-group-item">
                  <div className="fw-bold mb-1"><i className="bi bi-star me-2 text-warning"></i>Top Attraction</div>
                  <small>{cityItineraries[city2]?.[0]?.activities[0]}</small>
                </li>
                <li className="list-group-item">
                  <div className="fw-bold mb-1"><i className="bi bi-egg-fried me-2 text-danger"></i>Must Try Food</div>
                  <small>{cityCuisine[city2]?.[0]?.dish}</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareCities;
