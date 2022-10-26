import { useState } from "react";
import Car from "./components/car/car";
import Person from "./components/person/Person";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1> Our project starts now!</h1>
      <Car />
      <Person />
    </div>
  );
}

export default App;
