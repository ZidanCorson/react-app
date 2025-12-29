import { useState, useEffect, useMemo } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import CityDetails from "./components/CityDetails";
import CompareCities from "./components/CompareCities";
import { items, cityImages } from "./data/cities";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("travel-app-selected-city") || "";
  });
  const [favorites, setFavorites] = useLocalStorage<string[]>("travel-app-favorites", []);
  const [view, setView] = useState<'home' | 'favorites' | 'compare'>('home');
  const [isComparing, setIsComparing] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem("travel-app-selected-city", selectedCity);
    } else {
      localStorage.removeItem("travel-app-selected-city");
    }
  }, [selectedCity]);

  const toggleFavorite = (e: React.MouseEvent, city: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(city) 
        ? prev.filter(c => c !== city) 
        : [...prev, city]
    );
  };

  const handleSelectItem = (item: string) => {
    if (isComparing) {
      setCompareList(prev => {
        if (prev.includes(item)) return prev.filter(c => c !== item);
        if (prev.length >= 2) return prev;
        return [...prev, item];
      });
    } else {
      setSelectedCity(item);
      setAlertVisible(true);
    }
  };

  const handleSurpriseMe = () => {
    const availableCities = items.filter(city => city !== selectedCity);
    const randomCity = availableCities[Math.floor(Math.random() * availableCities.length)];
    handleSelectItem(randomCity);
  };

  const handleBack = () => {
    setAlertVisible(false);
    setSelectedCity("");
    setView('home');
    setIsComparing(false);
    setCompareList([]);
  };

  const startComparison = () => {
    if (compareList.length === 2) {
      setView('compare');
    }
  };

  const filteredItems = useMemo(() => items.filter(city => {
    const matchesSearch = city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesView = view === 'home' || view === 'compare' || favorites.includes(city);
    return matchesSearch && matchesView;
  }), [items, searchQuery, view, favorites]);

  return ( 
    <div className="app-overlay">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h1 className="mb-5 text-center main-title text-white text-shadow">Luxury Travel Selector</h1>
            
            {alertVisible && !isComparing && view !== 'compare' && (
              <Alert onClose={() => setAlertVisible(false)}>
                {selectedCity 
                  ? `Excellent choice. We have curated an exclusive experience for ${selectedCity}.` 
                  : "Please select a destination to begin your journey."}
              </Alert>
            )}
            
            {!selectedCity && view !== 'compare' && (
              <>
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 mb-5">
                  <div className="bg-white p-1 rounded-pill shadow-sm d-flex filter-container">
                    <button 
                      className={`btn rounded-pill px-4 fw-bold filter-button ${view === 'home' && !isComparing ? 'btn-primary shadow-sm' : 'btn-light bg-transparent text-muted border-0'}`}
                      onClick={() => { setView('home'); setIsComparing(false); }}
                    >
                      All Destinations
                    </button>
                    <button 
                      className={`btn rounded-pill px-4 fw-bold filter-button ${view === 'favorites' && !isComparing ? 'btn-primary shadow-sm' : 'btn-light bg-transparent text-muted border-0'}`}
                      onClick={() => { setView('favorites'); setIsComparing(false); }}
                    >
                      <i className={`bi ${view === 'favorites' ? 'bi-heart-fill' : 'bi-heart'} me-2 ${view === 'favorites' ? '' : 'text-danger'}`}></i>
                      Bucket List
                    </button>
                    <button 
                      className={`btn rounded-pill px-4 fw-bold filter-button ${isComparing ? 'btn-primary shadow-sm' : 'btn-light bg-transparent text-muted border-0'}`}
                      onClick={() => { setIsComparing(!isComparing); setCompareList([]); }}
                    >
                      <i className="bi bi-arrow-left-right me-2"></i>
                      Compare
                    </button>
                  </div>

                  <div className="position-relative" style={{ width: "350px", maxWidth: "100%" }}>
                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ zIndex: 5 }}></i>
                    <input 
                      type="text" 
                      className="form-control border-0 shadow-sm rounded-pill ps-5 py-2 search-input" 
                      placeholder={view === 'favorites' ? "Search your bucket list..." : "Search destinations..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {isComparing && (
                  <div className="alert alert-info text-center shadow-sm mb-4">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    Select 2 destinations to compare ({compareList.length}/2)
                    {compareList.length === 2 && (
                      <button className="btn btn-sm btn-primary ms-3" onClick={startComparison}>
                        Compare Now
                      </button>
                    )}
                  </div>
                )}

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                  {filteredItems.map((city) => (
                    <div key={city} className="col">
                      <div 
                        className={`card h-100 shadow-sm city-card border-0 position-relative ${compareList.includes(city) ? 'ring-4 ring-primary' : ''}`}
                        onClick={() => handleSelectItem(city)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectItem(city) }}
                        role="button"
                        tabIndex={0}
                        style={{ 
                          cursor: "pointer", 
                          transition: "transform 0.2s",
                          border: compareList.includes(city) ? "4px solid #0d6efd" : "none",
                          transform: compareList.includes(city) ? "scale(1.02)" : "none"
                        }}
                      >
                        {!isComparing && (
                          <button
                            className="btn btn-link position-absolute top-0 end-0 p-3 text-white favorite-btn"
                            onClick={(e) => toggleFavorite(e, city)}
                            title={favorites.includes(city) ? "Remove from Bucket List" : "Add to Bucket List"}
                            aria-label={favorites.includes(city) ? "Remove from Bucket List" : "Add to Bucket List"}
                          >
                            <i className={`bi ${favorites.includes(city) ? 'bi-heart-fill text-danger' : 'bi-heart'}`} style={{ fontSize: "1.5rem" }}></i>
                          </button>
                        )}
                        {isComparing && compareList.includes(city) && (
                          <div className="position-absolute top-0 end-0 p-3 text-white">
                            <i className="bi bi-check-circle-fill text-primary bg-white rounded-circle" style={{ fontSize: "1.5rem" }}></i>
                          </div>
                        )}
                        <div className="city-image-container">
                          <img 
                            src={cityImages[city]?.[0]} 
                            className="card-img-top h-100 w-100 city-image" 
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

                {!isComparing && (
                  <div className="text-center">
                    <Button color="light" className="btn-lg px-5 shadow" onClick={handleSurpriseMe}>
                      <i className="bi bi-stars me-2 text-warning"></i>Surprise Me!
                    </Button>
                  </div>
                )}
                
                <footer className="text-center mt-5 text-white-50">
                  <small>&copy; 2025 Luxury Travel Selector. All rights reserved.</small>
                </footer>
              </>
            )}

            {selectedCity && !isComparing && view !== 'compare' && (
              <CityDetails 
                selectedCity={selectedCity} 
                onBack={handleBack} 
              />
            )}

            {view === 'compare' && compareList.length === 2 && (
              <CompareCities 
                city1={compareList[0]} 
                city2={compareList[1]} 
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
