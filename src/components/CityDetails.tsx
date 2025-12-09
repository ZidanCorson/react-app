import Button from "./Button";
import WeatherWidget from "./WeatherWidget";
import CurrencyConverter from "./CurrencyConverter";
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
          <div className="col-md-6">
             <WeatherWidget city={selectedCity} />
          </div>
          <div className="col-md-6">
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
            <div className="alert alert-info h-100 d-flex align-items-center">
              <div>
                <strong>Travel Tip:</strong> {citySuggestions[selectedCity]}
              </div>
            </div>
          </div>
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
