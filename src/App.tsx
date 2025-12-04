import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  const items = ["New York", "San Francisco", "Tokyo", "Paris", "London"];
  
  const cityImages: { [key: string]: string[] } = {
    "New York": [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=300&h=200&fit=crop"
    ],
    "San Francisco": [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1521464302861-ce943915d1c3?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1565626424178-c699f6601afd?w=300&h=200&fit=crop"
    ],
    "Tokyo": [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=300&h=200&fit=crop"
    ],
    "Paris": [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?w=300&h=200&fit=crop"
    ],
    "London": [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=300&h=200&fit=crop"
    ]
  };

  const citySuggestions: { [key: string]: string } = {
    "New York": "Visit Central Park, see a Broadway show, and walk across the Brooklyn Bridge.",
    "San Francisco": "Walk across the Golden Gate Bridge, visit Alcatraz, and ride a cable car.",
    "Tokyo": "Visit the Senso-ji Temple, cross the Shibuya Crossing, and explore Akihabara.",
    "Paris": "Visit the Eiffel Tower, explore the Louvre Museum, and walk along the Seine River.",
    "London": "Visit the British Museum, see the Tower of London, and ride the London Eye."
  };

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
          <h1 className="mb-4 text-center">City Select App</h1>
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
                <Button color="primary" onClick={() => {setView("list"); setAlertVisible(false); setSelectedCity("");}}>Back to List</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
