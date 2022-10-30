import axios from 'axios';
import React from 'react';

const DeletePerson = () => {
  const onDelete = (id) => {
    axios.delete(`${BASE_URL}/person/${id}`).then(() => {
      getData();
    });
  };

  return <div>deletePerson</div>;
};

export default DeletePerson;
