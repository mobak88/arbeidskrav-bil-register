import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./createPerson.css";

const CreatePerson = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [carsOwned, setCarsOwned] = useState(null);

  const sendDataToAPI = () => {
    e.preventDefault();
    axios.post('http://194.32.107.29/GaAPI/person', {
      firstName,
      lastName,
      age,
      carsOwned
    });
  };

  return (
    <div className='createPerson-container'>
      <form className='createPerson-form'>
        <h1 className='createPerson-title'>Create a new user</h1> 
          <label  className='label-deco' htmlFor='fname'>First Name</label>
          <input className='input-decoration'
            name='fname'
            id='fname'
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
          />

          <label  className='label-deco' htmlFor='lname'>Last Name</label>
          <input className='input-decoration'
            name='lname'
            id='lname'
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
          />
    
          <label className='label-deco' htmlFor='age'>Age</label>
          <input className='input-decoration'
            type='number'
            name='age'
            id='age'
            onChange={(e) => setAge(e.target.value)}
            placeholder='Your age'
          />

          <label className='label-deco' htmlFor='carOwned'>Cars you own </label>
          <input className='input-decoration'
            name='carOwned'
            id='carOwned'
            onChange={(e) => setCarsOwned(e.target.value)}
            placeholder='Your Carbrand'
          />

        <button className="btn" type='submit' onClick={sendDataToAPI}>
          Submit
        </button>
        <Link to ="/menu"><button className='btn'>Cancel</button></Link>
      </form>
    </div>
  );
};

export default CreatePerson;
