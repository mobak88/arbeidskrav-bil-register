import { useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import axios from 'axios';
import API_ENDPOINTS from '../../api/endpoints';
import EditPerson from './editPerson';
import { PersonCtx } from '../../contexts/personCtx';
import './Person.css';

const Person = () => {
  const [personFormValue, setPersonFormValue] = useState({});
  const [userId, setUserId] = useState(null);
  const [isEditingPerson, setIsEditingPerson] = useState(false);
  const [personData, setPersonData] = useState({});
  const [allPersonsData, setAllPersonsData] = useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);

  useEffect(() => {
    if (data.persons) {
      const { persons } = data;
      setAllPersonsData([...persons]);
    }
  }, [data]);

  useEffect(() => {
    if (userId) {
      updatePerson(userId);
    }
  }, [personFormValue]);

  useEffect(() => {
    if (data?.persons) {
      const { persons } = data;
      const [person] = persons.filter((user) => user.id === userId);
      setPersonData(person);
    }
  }, [userId]);

  const updatePersonHandler = (personId) => {
    setUserId(personId);
    setIsEditingPerson((prevState) => !prevState);
  };

  const updatePerson = async (id) => {
    try {
      const res = await axios.put(`${API_ENDPOINTS.person(id)}`, {
        ...personFormValue
      });

      setAllPersonsData((prevState) => {
        const newState = prevState.map((person) => {
          if (person.id === id) {
            return { ...personFormValue, id: id };
          }
          return person;
        });
        return [...newState];
      });

      if (res.ok) {
        personData({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePerson = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.person(id)}`);
      setAllPersonsData((prevState) =>
        prevState.filter((person) => person.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PersonCtx.Provider
      value={{
        personFormValue,
        setPersonFormValue,
        isEditingPerson,
        setIsEditingPerson
      }}
    >
      <div className='persons-container'>
        {isLoading && 'Loading...'}
        {fetchError && `Error: ${fetchError}`}
        {isEditingPerson && <EditPerson personData={personData} />}
        {isEditingPerson && <EditPerson personData={personData} />}
        {allPersonsData &&
          allPersonsData.map((person) => {
            return (
              <div className='person-container' key={person.id}>
                <div className='information-wrapper'>
                  <h3>Information</h3>
                  <p className='first-name'>
                    Name: {person?.firstName} {person?.lastName}
                  </p>
                  <p className='age'>Age: {person?.age}</p>
                  <p className='cars-owned'>Cars owned: {person?.carsOwned}</p>
                </div>
                <div className='button-wrapper'>
                  <button onClick={() => updatePersonHandler(person.id)}>
                    Edit
                  </button>
                </div>
                <div className='button-wrapper'>
                  <button onClick={() => deletePerson(person.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </PersonCtx.Provider>
  );
};

export default Person;
