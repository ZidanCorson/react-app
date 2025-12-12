import { useState, useEffect } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import CityDetails from "./components/CityDetails";
import { items, cityImages } from "./data/cities";
import "./App.css";

function App() {
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("travel-app-selected-city") || "";
  });
  const [view, setView] = useState(() => {
    return localStorage.getItem("travel-app-selected-city") ? "details" : "list";
  });
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem("travel-app-selected-city", selectedCity);
    } else {
      localStorage.removeItem("travel-app-selected-city");
    }
  }, [selectedCity]);

  const handleSelectItem = (item: string) => {
    setSelectedCity(item);
    setAlertVisible(true);
    setView("details");
  };

  const handleSurpriseMe = () => {
    const randomCity = items[Math.floor(Math.random() * items.length)];
    handleSelectItem(randomCity);
  };

  const handleBack = () => {
    setView("list");
    setAlertVisible(false);
    setSelectedCity("");
  };

  return ( 
    <div className="app-overlay">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h1 className="mb-5 text-center main-title text-white text-shadow">Luxury Travel Selector</h1>
            
            {alertVisible && (
              <Alert onClose={() => setAlertVisible(false)}>
                {selectedCity 
                  ? `Excellent choice. We have curated an exclusive experience for ${selectedCity}.` 
                  : "Please select a destination to begin your journey."}
              </Alert>
            )}
            
            {view === "list" && (
              <>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                  {items.map((city) => (
                    <div key={city} className="col">
                      <div 
                        className="card h-100 shadow-sm city-card border-0" 
                        onClick={() => handleSelectItem(city)}
                        style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      >
                        <div style={{ height: "200px", overflow: "hidden" }}>
                          <img 
                            src={cityImages[city]?.[0]} 
                            className="card-img-top h-100 w-100" 
                            style={{ objectFit: "cover" }}
                            alt={city} 
                          />
                        </div>
                        <div className="card-body text-center">
                          <h5 className="card-title mb-0">{city}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button color="light" className="btn-lg px-5 shadow" onClick={handleSurpriseMe}>
                    <i className="bi bi-stars me-2 text-warning"></i>Surprise Me!
                  </Button>
                </div>
              </>
            )}

            {view === "details" && selectedCity && (
              <CityDetails 
                selectedCity={selectedCity} 
                onBack={handleBack} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
