import { useRef, useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import axios from 'axios';
import API_ENDPOINTS from '../../api/endpoints';
import './Person.css';

const Person = () => {
  const [personFormValue, setPersonFormValue] = useState({});
  const [userId, setUserId] = useState(null);
  const [isEditingPerson, setIsEditingPerson] = useState(false);
  const [personData, setPersonData] = useState({});
  const [allPersonsData, setAllPersonsData] = useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const carsOwnedRef = useRef(null);

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

  const getFormValue = () => {
    setPersonFormValue({
      firstName:
        firstNameRef.current.length > 0
          ? firstNameRef.current
          : personData.firstName,
      lastName:
        lastNameRef.current.length > 0
          ? lastNameRef.current
          : personData.lastName,
      age: ageRef.current.length > 0 ? ageRef.current : personData.age,
      carsOwned:
        carsOwnedRef.current.length > 0
          ? carsOwnedRef.current
          : personData.carsOwned
    });
  };

  const submitPersonForm = (e) => {
    e.preventDefault();
    getFormValue();
    setIsEditingPerson((prevState) => !prevState);
  };

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
    <div className='persons-container'>
      {isEditingPerson && (
        <form action=''>
          <label htmlFor='first-name'>First Name</label>
          <input
            type='text'
            id='first-Name'
            ref={firstNameRef}
            defaultValue={personData?.firstName || ''}
            onChange={(e) => {
              firstNameRef.current = e.target.value;
            }}
          />
          <label htmlFor='last-name-input'>Last Name</label>
          <input
            type='text'
            id='last-name'
            ref={lastNameRef}
            defaultValue={personData?.lastName || ''}
            onChange={(e) => {
              lastNameRef.current = e.target.value;
            }}
          />
          <label htmlFor='age-input'>Age</label>
          <input
            type='number'
            id='age'
            ref={ageRef}
            defaultValue={personData?.age || ''}
            onChange={(e) => {
              ageRef.current = e.target.value;
            }}
          />
          <label htmlFor='cars-owned'>Cars Owned</label>
          <input
            type='text'
            id='cars-owned'
            ref={carsOwnedRef}
            defaultValue={personData?.carsOwned || ''}
            onChange={(e) => {
              carsOwnedRef.current = e.target.value;
            }}
          />
          <button onClick={submitPersonForm}>Update</button>
        </form>
      )}
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
                <button onClick={() => deletePerson(person.id)}>Delete</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Person;
