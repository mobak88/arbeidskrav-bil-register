import { useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import API_ENDPOINTS from '../../api/endpoints';

const Car = () => {
  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      <p>Merke</p>
      <p>Model</p>
      <p>År</p>
    </div>
  );
};

export default Car;
