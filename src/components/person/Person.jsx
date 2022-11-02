import { useRef, useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import axios from 'axios';
import API_ENDPOINTS from '../../api/endpoints';
import './Person.css';

const Person = () => {
  const [personInfo, setPersonInfo] = useState({});
  const [userId, setUserId] = useState(null);
  const [isEditingPerson, setIsEditingPerson] = useState(false);
  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const carsOwnedRef = useRef(null);

  useEffect(() => {
    if (userId) {
      console.log(userId);
      updatePerson(userId);
    }
  }, [personInfo]);

  const getFormValue = () => {
    const { persons } = data;
    const [person] = persons.filter((user) => user.id === userId);
    setPersonInfo({
      firstName:
        firstNameRef.current.length > 0
          ? firstNameRef.current
          : person.firstName,
      lastName:
        lastNameRef.current.length > 0 ? lastNameRef.current : person.lastName,
      age: ageRef.current.length > 0 ? ageRef.current : person.age,
      carsOwned:
        carsOwnedRef.current.length > 0
          ? carsOwnedRef.current
          : person.carsOwned
    });
  };

  const submitPersonForm = (e) => {
    e.preventDefault();
    getFormValue();
    setIsEditingPerson((prevState) => !prevState);
  };

  const getUserId = (personId) => {
    setUserId(personId);
    setIsEditingPerson((prevState) => !prevState);
  };

  const updatePerson = async (id) => {
    try {
      const res = await axios.put(`${API_ENDPOINTS.person(id)}`, {
        ...personInfo
      });
      if (res.ok) {
        setPersonInfo({});
      }
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
            onChange={(e) => {
              firstNameRef.current = e.target.value;
            }}
            required
          />
          <label htmlFor='last-name-input'>Last Name</label>
          <input
            type='text'
            id='last-name'
            ref={lastNameRef}
            onChange={(e) => {
              lastNameRef.current = e.target.value;
            }}
            required
          />
          <label htmlFor='age-input'>Age</label>
          <input
            type='number'
            id='age'
            ref={ageRef}
            onChange={(e) => {
              ageRef.current = e.target.value;
            }}
            required
          />
          <label htmlFor='cars-owned'>Cars Owned</label>
          <input
            type='text'
            id='cars-owned'
            ref={carsOwnedRef}
            onChange={(e) => {
              carsOwnedRef.current = e.target.value;
            }}
            required
          />
          <button onClick={submitPersonForm}>Update</button>
        </form>
      )}
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
                <button onClick={() => getUserId(person.id)}>Edit</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Person;
