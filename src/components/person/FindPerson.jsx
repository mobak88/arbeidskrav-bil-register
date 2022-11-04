import { useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import API_ENDPOINTS from '../../api/endpoints';

const FindPerson = () => {
  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);

  useEffect(() => {
    if (data) console.log(data);
  }, []);

  return <div>FindPerson</div>;
};

export default FindPerson;
