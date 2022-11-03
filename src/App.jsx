import Car from './components/car/car';
import CreatePerson from './components/person/CreatePerson';
import Login from './components/authorization/Login';
import Layout from './components/Layout';
import Unathorized from './components/authorization/Unauthorization';
import Person from './components/person/Person';
import Register from './components/authorization/Register';
import Menu from './components/Menu';
import { Routes, Route } from 'react-router-dom';
import './App.css';



function App() {
  return (
    <div className='main-container'>
      <Routes>
        <Route exact path='/' element={<Layout />} />
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
