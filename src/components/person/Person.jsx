import { useRef, useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import API_ENDPOINTS from '../../api/endpoints';
import './Person.css';

const Person = () => {
  const [personInfo, setPersonInfo] = useState({});

  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const carsOwnedRef = useRef(null);

  useEffect(() => {
    updatePerson();
  }, [personInfo]);

  const getFormValue = () => {
    setPersonInfo({
      firstName: firstNameRef.current,
      lastName: lastNameRef.current,
      age: ageRef.current,
      carsOwned: carsOwnedRef.current
    });
  };

  const submitPersonForm = (e) => {
    e.preventDefault();
    getFormValue();
  };

  const updatePerson = () => {
    fetch('http://194.32.107.29/GaAPI/person/8', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...personInfo
      })
    });
  };

  return (
    <div className='persons-container'>
      <form action=''>
        <label htmlFor='first-name'>First Name</label>
        <input
          type='text'
          id='first-Name'
          onChange={(e) => {
            firstNameRef.current = e.target.value;
          }}
          ref={firstNameRef}
        />
        <label htmlFor='last-name-input'>Last Name</label>
        <input
          type='text'
          id='last-name'
          ref={lastNameRef}
          onChange={(e) => {
            lastNameRef.current = e.target.value;
          }}
        />
        <label htmlFor='age-input'>Age</label>
        <input
          type='number'
          id='age'
          ref={ageRef}
          onChange={(e) => {
            ageRef.current = e.target.value;
          }}
        />
        <label htmlFor='cars-owned'>Cars Owned</label>
        <input
          type='text'
          id='cars-owned'
          ref={carsOwnedRef}
          onChange={(e) => {
            carsOwnedRef.current = e.target.value;
          }}
        />
        <button onClick={submitPersonForm}>Update</button>
      </form>
      {data &&
        data.persons?.map((person) => {
          return (
            <div className='person-container' key={person.id}>
              <div className='information-wrapper'>
                <h3>Information</h3>
                <p className='first-name'>{person?.firstName}</p>
                <p className='last-name'>{person?.lastName}</p>
                <p className='age'>{person?.age}</p>
                <p className='cars-owned'>{person?.carsOwned}</p>
              </div>
              <div className='button-wrapper'>
                <button>Edit</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Person;
