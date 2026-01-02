import { useState } from "react";
import WeatherWidget from "./WeatherWidget";
import CurrencyConverter from "./CurrencyConverter";
import LocalTimeClock from "./LocalTimeClock";
import LocalPhrasebook from "./LocalPhrasebook";
import SmartPackingList from "./SmartPackingList";
import TripBudgetEstimator from "./TripBudgetEstimator";
import DailyItinerary from "./DailyItinerary";
import LocalCuisineGuide from "./LocalCuisineGuide";
import TravelJournal from "./TravelJournal";
import { cityImages, citySuggestions, cityCoordinates, cityItineraries } from "../data/cities";
import { useWeather } from "../hooks/useWeather";

interface Props {
  selectedCity: string;
  onBack: () => void;
}

const CityDetails = ({ selectedCity, onBack }: Props) => {
  const coords = cityCoordinates[selectedCity];
  const { weather, loading, error } = useWeather(selectedCity);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = async () => {
    const itinerary = cityItineraries[selectedCity];
    const activities = itinerary 
      ? itinerary.map(day => `- Day ${day.day}: ${day.title} (${day.activities.join(", ")})`).join("\n")
      : "Explore the city!";

    const summary = `
✈️ Trip to ${selectedCity}
💰 Estimated Budget: $${Math.round(estimatedCost).toLocaleString()}

🌟 Top Activities:
${activities}

Check out this trip on Luxury Travel Selector!
    `.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Trip to ${selectedCity}`,
          text: summary,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fall back to clipboard
        console.debug('Share failed or cancelled, falling back to clipboard', err);
      }
    }

    navigator.clipboard.writeText(summary).then(() => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    });
  };

  return (
    <div className="card shadow-sm mb-4 position-relative">
      {showShareToast && (
        <div 
          className="position-fixed top-0 start-50 translate-middle-x mt-4 p-3 bg-success text-white rounded shadow" 
          style={{ zIndex: 1050, transition: "opacity 0.5s" }}
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          Trip summary copied to clipboard!
        </div>
      )}

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2>Photos and Advice for {selectedCity}</h2>
            <p className="mb-0">Here are some great photos and travel tips for your trip to {selectedCity}!</p>
          </div>
          <button 
            className="btn-share-luxury" 
            onClick={handleShare}
            title="Share Trip Summary"
          >
            <i className="bi bi-send-fill me-2"></i>
            Share Trip
          </button>
        </div>
        
        <div className="row mb-4">
          <div className="col-md-4">
             <WeatherWidget weather={weather} loading={loading} error={error} />
          </div>
          <div className="col-md-4">
             <LocalTimeClock weather={weather} loading={loading} />
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
            <TripBudgetEstimator city={selectedCity} onCostChange={setEstimatedCost} />
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
            <LocalCuisineGuide city={selectedCity} />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <SmartPackingList city={selectedCity} weather={weather} loading={loading} />
          </div>
          <div className="col-md-6">
            <TravelJournal city={selectedCity} />
          </div>
        </div>

        <div className="alert alert-info mb-4">
          <strong>Travel Tip:</strong> {citySuggestions[selectedCity]}
        </div>
        
        {cityImages[selectedCity] && (
          <div className="row mb-3">
            {cityImages[selectedCity].map((imgSrc, index) => (
              <div className="col-4" key={index}>
                <img 
                  src={imgSrc} 
                  className="img-fluid rounded shadow-sm w-100" 
                  style={{ height: '200px', objectFit: 'cover' }}
                  alt={`${selectedCity} view ${index + 1}`} 
                />
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-5">
          <button className="btn-back-luxury" onClick={onBack}>
            <i className="bi bi-arrow-left"></i>
            Back to Destinations
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
