import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";

const CreatePerson = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [carsOwned, setCarsOwned] = useState(null);

  const sendDataToAPI = () => {
    axios.post("http://194.32.107.29/GaAPI/person", {
      firstName,
      lastName,
      age,
      carsOwned,
    });
  };

  const test = () => {
    console.log("Return to start menu");
  };

  return (
    <div>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input
            name="fname"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </Form.Field>

        <Form.Field>
          <label>Last Name</label>
          <input
            name="lname"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </Form.Field>

        <Form.Field>
          <label>Age</label>
          <input
            type="number"
            name="age"
            onChange={(e) => setAge(e.target.value)}
            placeholder="Your age"
          />
        </Form.Field>

        <Form.Field>
          <label>Cars you own </label>
          <input
            name="carOwned"
            onChange={(e) => setCarsOwned(e.target.value)}
            placeholder="Your Carbrand"
          />
        </Form.Field>
        <Button type="submit" onClick={sendDataToAPI}>
          Submit
        </Button>
        <Button onClick={test}>Cancel</Button>
      </Form>
    </div>
  );
};

export default CreatePerson;
