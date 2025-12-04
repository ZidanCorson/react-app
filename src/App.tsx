import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import CityDetails from "./components/CityDetails";
import { items } from "./data/cities";
import "./App.css";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [view, setView] = useState("list");
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSelectItem = (item: string) => {
    setSelectedCity(item);
    console.log(item);
  };

  const handleButtonClick = () => {
    if (selectedCity) {
      setAlertVisible(true);
      setView("details");
    } else {
      setAlertVisible(true);
    }
  };

  return ( 
    <div className="app-overlay">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="mb-4 text-center">Luxury Travel Selector</h1>
            {alertVisible && (
              <Alert onClose={() => setAlertVisible(false)}>
                {selectedCity 
                  ? `Excellent choice. We have curated an exclusive experience for ${selectedCity}.` 
                  : "Please select a destination to begin your journey."}
              </Alert>
            )}
            
            {view === "list" && (
              <>
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <ListGroup items={items} heading="Select Destination" onSelectItem={handleSelectItem}/>
                  </div>
                </div>
                <div className="text-center">
                  <Button color="success" onClick={handleButtonClick}>Explore City</Button> 
                </div>
              </>
            )}

            {view === "details" && selectedCity && (
              <CityDetails 
                selectedCity={selectedCity} 
                onBack={() => {setView("list"); setAlertVisible(false); setSelectedCity("");}} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
