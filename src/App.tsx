import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import CityDetails from "./components/CityDetails";
import { items } from "./data/cities";

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4 text-center">City Selector App</h1>
          {alertVisible && (
            <Alert onClose={() => setAlertVisible(false)}>
              {selectedCity 
                ? `Yeah that's a great city to go to, I can give you some photos and travel suggestions for ${selectedCity}.` 
                : "Please select a city first."}
            </Alert>
          )}
          
          {view === "list" && (
            <>
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
                </div>
              </div>
              <div className="text-center">
                <Button color="success" onClick={handleButtonClick}>Go to City</Button> 
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
  );
}

export default App;
