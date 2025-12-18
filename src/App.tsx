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
  const [alertVisible, setAlertVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
  };

  const handleSurpriseMe = () => {
    const availableCities = items.filter(city => city !== selectedCity);
    const randomCity = availableCities[Math.floor(Math.random() * availableCities.length)];
    handleSelectItem(randomCity);
  };

  const handleBack = () => {
    setAlertVisible(false);
    setSelectedCity("");
  };

  const filteredItems = items.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            
            {!selectedCity && (
              <>
                <div className="mb-4 d-flex justify-content-center">
                  <div className="input-group" style={{ maxWidth: "500px" }}>
                    <span className="input-group-text bg-white border-0"><i className="bi bi-search"></i></span>
                    <input 
                      type="text" 
                      className="form-control border-0 shadow-sm p-3" 
                      placeholder="Search destinations..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ borderRadius: "0 30px 30px 0" }}
                    />
                  </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                  {filteredItems.map((city) => (
                    <div key={city} className="col">
                      <div 
                        className="card h-100 shadow-sm city-card border-0" 
                        onClick={() => handleSelectItem(city)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectItem(city) }}
                        role="button"
                        tabIndex={0}
                        style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      >
                        <div style={{ height: "200px", overflow: "hidden" }}>
                          <img 
                            src={cityImages[city]?.[0]} 
                            className="card-img-top h-100 w-100" 
                            style={{ objectFit: "cover" }}
                            alt={city} 
                            loading="lazy"
                          />
                        </div>
                        <div className="card-body text-center">
                          <h5 className="card-title mb-0">{city}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredItems.length === 0 && (
                   <div className="text-center text-white mb-5">
                     <p className="fs-4">No destinations found matching "{searchQuery}"</p>
                   </div>
                )}

                <div className="text-center">
                  <Button color="light" className="btn-lg px-5 shadow" onClick={handleSurpriseMe}>
                    <i className="bi bi-stars me-2 text-warning"></i>Surprise Me!
                  </Button>
                </div>
              </>
            )}

            {selectedCity && (
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
