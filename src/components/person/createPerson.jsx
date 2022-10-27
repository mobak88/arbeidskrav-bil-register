import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
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
      <Form>
        <Form.Field>
          <label htmlFor='fname'>First Name</label>
          <input
            name='fname'
            id='fname'
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
          />
        </Form.Field>

        <Form.Field>
          <label htmlFor='lname'>Last Name</label>
          <input
            name='lname'
            id='lname'
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
          />
        </Form.Field>

        <Form.Field>
          <label htmlFor='age'>Age</label>
          <input
            type='number'
            name='age'
            id='age'
            onChange={(e) => setAge(e.target.value)}
            placeholder='Your age'
          />
        </Form.Field>

        <Form.Field>
          <label htmlFor='carOwned'>Cars you own </label>
          <input
            name='carOwned'
            id='carOwned'
            onChange={(e) => setCarsOwned(e.target.value)}
            placeholder='Your Carbrand'
          />
        </Form.Field>
        <Button type='submit' onClick={sendDataToAPI}>
          Submit
        </Button>
        <Button onClick={test}>Cancel</Button>
      </Form>
    </div>
  );
};

export default CreatePerson;
