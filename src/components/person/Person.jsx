import { useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import API_ENDPOINTS from '../../api/endpoints';
import EditPerson from './EditPerson';
import PersonCtx from '../../contexts/personCtx';
import { deleteFromAPI, updateToAPI } from '../../helpers/httpReuqests';
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
    if (userId && Object.keys(personFormValue).length !== 0) {
      updateToAPI(personFormValue, `${API_ENDPOINTS.person(userId)}`);

      setAllPersonsData((prevState) => {
        const newState = prevState.map((person) => {
          if (person.id === userId) {
            return { ...personFormValue, id: userId };
          }
          return person;
        });
        return [...newState];
      });

      setPersonData({});
    }
  }, [personFormValue]);

  useEffect(() => {
    if (data?.persons) {
      const { persons } = data;
      const [person] = persons.filter((user) => user.id === userId);
      setPersonData({ ...person });
    }
  }, [userId]);

  const updatePersonHandler = (personId) => {
    if (!isEditingPerson) {
      setIsEditingPerson((prevState) => !prevState);
    }
    setUserId(personId);
    console.log(personId);
    const { persons } = data;
    const [person] = persons.filter((user) => user.id === userId);
    setPersonData({ ...person });
  };

  const deletePersonHandler = (id) => {
    deleteFromAPI(`${API_ENDPOINTS.person(id)}`);
    setAllPersonsData((prevState) =>
      prevState.filter((person) => person.id !== id)
    );
    if (isEditingPerson) setIsEditingPerson((prevState) => !prevState);
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
                  <button onClick={() => deletePersonHandler(person.id)}>
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
