import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  const items = ["New York", "San Francisco", "Tokyo", "Paris", "London"];
  
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [alertVisible, setAlertVisible] = useState(false);
  return ( 
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4 text-center">My Awesome App</h1>
          {alertVisible && <Alert onClose={() => setAlertVisible(false)}>Alert message</Alert> }
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
            </div>
          </div>
          <div className="text-center">
            <Button color="success" onClick={() => {console.log("Button clicked"); setAlertVisible(true)}}>Click me</Button> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
