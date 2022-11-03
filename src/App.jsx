import { useState } from 'react';
import Car from './components/car/car';
import CreatePerson from './components/person/CreatePerson';
import Login from './components/authorization/Login';
import Layout from './components/Layout';
import Unathorized from './components/authorization/Unauthorization';
import RequireAuth from './components/authorization/RequireAuth';
import Person from './components/person/Person';
import Register from './components/authorization/Register';
import Menu from './components/Menu';
import useAxiosFetch from './hooks/useAxiosFetch';
import API_ENDPOINTS from './api/endpoints';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const ROLES = {
  User: 2001,
  Admin: 5151
};

function App() {
  return (
    <div className='main-container'>
      <Routes>
        <Route exact path='/' element={<Layout />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='menu' element={<Menu />} />
        <Route path='unathorized' element={<Unathorized />} />
        <Route exact path='/person' element={<Person />} />
        <Route path='createUser' element={<CreatePerson />} />
      </Routes>
    </div>
  );
}
export default App;
