import Button from "./Button";
import { cityImages, citySuggestions } from "../data/cities";

interface Props {
  selectedCity: string;
  onBack: () => void;
}

const CityDetails = ({ selectedCity, onBack }: Props) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2>Photos and Advice for {selectedCity}</h2>
        <p>Here are some great photos and travel tips for your trip to {selectedCity}!</p>
        <div className="alert alert-info">
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
