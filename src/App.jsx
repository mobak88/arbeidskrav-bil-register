import { useState } from "react";
import Car from "./components/car/car";
import Person from "./components/person/Person";
import useFetch from "./hooks/useFetch";
import API_ENDPOINTS from "./api/endpoints";
import "./App.css";

function App() {
  const { loading, error, data } = useFetch(`${API_ENDPOINTS.car(1)}`);

  if (data) console.log(data);

  return (
    <div className="App">
      <h1> Our project starts now!</h1>
      <Car />
      <Person />
    </div>
  );
}

export default App;
