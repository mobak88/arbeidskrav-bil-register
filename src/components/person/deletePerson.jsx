import axios from 'axios';
import React from 'react';
import BASE_URL from './src/api/endpoints';

const onDelete = (id) => {
  axios.delete(`${BASE_URL}/person/${id}`).then(() => {
    getData();
  });
};

const DeletePerson = () => {
  return (
    <p>Testing</p>
    <input type='button' onClick={onDelete}>
      Delete User
    </input>
  );
};

export default DeletePerson;
