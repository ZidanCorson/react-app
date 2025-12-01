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
    <div>
      {alertVisible && <Alert onClose={() => setAlertVisible(false)}>Alert message</Alert> }
      <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
      <Button color="success" onClick={() => {console.log("Button clicked"); setAlertVisible(true)}}>Click me</Button> 
    </div>
  );
}

export default App;
