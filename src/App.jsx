import { useState } from "react";
import Car from "./components/car/car";
import CreatePerson from "./components/person/createPerson";
import Person from "./components/person/Person";
import useAxiosFetch from "./hooks/useAxiosFetch";
import API_ENDPOINTS from "./api/endpoints";
import { Routes, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);
  if (data) {
    console.log(data);
  }

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Person />} />
        <Route path="/createUser" element={<CreatePerson />} />
      </Routes>
    </div>
  );
}
export default App;
