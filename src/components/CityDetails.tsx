import Button from "./Button";
import WeatherWidget from "./WeatherWidget";
import CurrencyConverter from "./CurrencyConverter";
import LocalTimeClock from "./LocalTimeClock";
import LocalPhrasebook from "./LocalPhrasebook";
import SmartPackingList from "./SmartPackingList";
import TripBudgetEstimator from "./TripBudgetEstimator";
import DailyItinerary from "./DailyItinerary";
import { cityImages, citySuggestions, cityCoordinates } from "../data/cities";

interface Props {
  selectedCity: string;
  onBack: () => void;
}

const CityDetails = ({ selectedCity, onBack }: Props) => {
  const coords = cityCoordinates[selectedCity];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2>Photos and Advice for {selectedCity}</h2>
        <p>Here are some great photos and travel tips for your trip to {selectedCity}!</p>
        
        <div className="row mb-4">
          <div className="col-md-4">
             <WeatherWidget city={selectedCity} />
          </div>
          <div className="col-md-4">
             <LocalTimeClock city={selectedCity} />
          </div>
          <div className="col-md-4">
            {coords && (
              <div className="ratio ratio-16x9 h-100 shadow-sm rounded overflow-hidden" style={{ minHeight: '200px' }}>
                <iframe
                  src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=12&output=embed`}
                  title="City Map"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <CurrencyConverter city={selectedCity} />
          </div>
          <div className="col-md-6">
            <TripBudgetEstimator city={selectedCity} />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <DailyItinerary city={selectedCity} />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <LocalPhrasebook city={selectedCity} />
          </div>
          <div className="col-md-6">
            <SmartPackingList city={selectedCity} />
          </div>
        </div>

        <div className="alert alert-info mb-4">
          <strong>Travel Tip:</strong> {citySuggestions[selectedCity]}
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <img src={cityImages[selectedCity]?.[0]} className="img-fluid rounded shadow-sm" alt={`${selectedCity} view 1`} />
          </div>
          <div className="col-4">
            <img src={cityImages[selectedCity]?.[1]} className="img-fluid rounded shadow-sm" alt={`${selectedCity} view 2`} />
          </div>
          <div className="col-4">
            <img src={cityImages[selectedCity]?.[2]} className="img-fluid rounded shadow-sm" alt={`${selectedCity} view 3`} />
          </div>
        </div>
        <Button color="primary" onClick={onBack}>Back to List</Button>
      </div>
    </div>
  );
};

export default CityDetails;
