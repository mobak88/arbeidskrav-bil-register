import React, { useState } from 'react';
import axios from 'axios';

const CreatePerson = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [carsOwned, setCarsOwned] = useState(null);

  const sendDataToAPI = () => {
    axios.post('http://194.32.107.29/GaAPI/person', {
      firstName,
      lastName,
      age,
      carsOwned
    });
  };

  const test = () => {
    console.log('Return to start menu');
  };

  return (
    <div>
      <form>
        <label htmlFor='fname'>First Name</label>
        <input
          name='fname'
          id='fname'
          onChange={(e) => setFirstName(e.target.value)}
          placeholder='First Name'
        />

        <label htmlFor='lname'>Last Name</label>
        <input
          name='lname'
          id='lname'
          onChange={(e) => setLastName(e.target.value)}
          placeholder='Last Name'
        />

        <label htmlFor='age'>Age</label>
        <input
          type='number'
          name='age'
          id='age'
          onChange={(e) => setAge(e.target.value)}
          placeholder='Your age'
        />

        <label htmlFor='carOwned'>Cars you own </label>
        <input
          name='carOwned'
          id='carOwned'
          onChange={(e) => setCarsOwned(e.target.value)}
          placeholder='Your Carbrand'
        />

        <button type='submit' onClick={sendDataToAPI}>
          Submit
        </button>
        <button onClick={test}>Cancel</button>
      </form>
    </div>
  );
};

export default CreatePerson;
