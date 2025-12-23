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
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("travel-app-favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [view, setView] = useState<'home' | 'favorites'>('home');
  const [alertVisible, setAlertVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem("travel-app-selected-city", selectedCity);
    } else {
      localStorage.removeItem("travel-app-selected-city");
    }
  }, [selectedCity]);

  useEffect(() => {
    localStorage.setItem("travel-app-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, city: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(city) 
        ? prev.filter(c => c !== city) 
        : [...prev, city]
    );
  };

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

  const filteredItems = items.filter(city => {
    const matchesSearch = city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesView = view === 'home' || favorites.includes(city);
    return matchesSearch && matchesView;
  });

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
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 mb-5">
                  <div className="bg-white p-1 rounded-pill shadow-sm d-flex" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
                    <button 
                      className={`btn rounded-pill px-4 fw-bold ${view === 'home' ? 'btn-primary shadow-sm' : 'btn-light bg-transparent text-muted border-0'}`}
                      onClick={() => setView('home')}
                      style={{ minWidth: "150px", transition: "all 0.3s ease" }}
                    >
                      All Destinations
                    </button>
                    <button 
                      className={`btn rounded-pill px-4 fw-bold ${view === 'favorites' ? 'btn-primary shadow-sm' : 'btn-light bg-transparent text-muted border-0'}`}
                      onClick={() => setView('favorites')}
                      style={{ minWidth: "150px", transition: "all 0.3s ease" }}
                    >
                      <i className={`bi ${view === 'favorites' ? 'bi-heart-fill' : 'bi-heart'} me-2 ${view === 'favorites' ? '' : 'text-danger'}`}></i>
                      Bucket List
                    </button>
                  </div>

                  <div className="position-relative" style={{ width: "350px", maxWidth: "100%" }}>
                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ zIndex: 5 }}></i>
                    <input 
                      type="text" 
                      className="form-control border-0 shadow-sm rounded-pill ps-5 py-2" 
                      placeholder={view === 'favorites' ? "Search your bucket list..." : "Search destinations..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.95)", 
                        height: "48px",
                        fontSize: "1rem"
                      }}
                    />
                  </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                  {filteredItems.map((city) => (
                    <div key={city} className="col">
                      <div 
                        className="card h-100 shadow-sm city-card border-0 position-relative" 
                        onClick={() => handleSelectItem(city)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectItem(city) }}
                        role="button"
                        tabIndex={0}
                        style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      >
                        <button
                          className="btn btn-link position-absolute top-0 end-0 p-3 text-white"
                          style={{ zIndex: 10, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
                          onClick={(e) => toggleFavorite(e, city)}
                          title={favorites.includes(city) ? "Remove from Bucket List" : "Add to Bucket List"}
                        >
                          <i className={`bi ${favorites.includes(city) ? 'bi-heart-fill text-danger' : 'bi-heart'}`} style={{ fontSize: "1.5rem" }}></i>
                        </button>
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
                     <p className="fs-4">
                       {view === 'favorites' 
                         ? (searchQuery ? `No favorites found matching "${searchQuery}"` : "Your bucket list is empty. Start adding destinations!") 
                         : `No destinations found matching "${searchQuery}"`}
                     </p>
                   </div>
                )}

                <div className="text-center">
                  <Button color="light" className="btn-lg px-5 shadow" onClick={handleSurpriseMe}>
                    <i className="bi bi-stars me-2 text-warning"></i>Surprise Me!
                  </Button>
                </div>
                
                <footer className="text-center mt-5 text-white-50">
                  <small>&copy; 2025 Luxury Travel Selector. All rights reserved.</small>
                </footer>
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
