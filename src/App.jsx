import { useState } from "react";
import Car from "./components/car/car";
import CreatePerson from "./components/person/CreatePerson";
import Login from './components/authorization/Login';
import Unathorized from "./components/authorization/Unauthorization";
import RequireAuth from "./components/authorization/RequireAuth";
import useAxiosFetch from "./hooks/useAxiosFetch";
import API_ENDPOINTS from "./api/endpoints";
import AuthContext from "./context/AuthProvider";
import { Routes, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css' // This is creating lag on our project and might be dropped
import "./App.css";

const ROLES = {
  'User': 2001,
  'Admin': 5151
}

function App() {
  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);
  
  return (
      <div className="main">
        <Routes>
            <Route exact path="/" element = { <App/> } />
            <Route path="login" element = { <Login/> } />
            <Route path="unathorized" element={<Unathorized/>} />

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="createUser" element = {<CreatePerson /> } />
            </Route>    
        </Routes>
      </div>
  );
}
export default App;
