import { useRef, useState, useEffect, useContext } from 'react';
import { PersonCtx } from '../../contexts/personCtx';
import './Person.css';

const EditPerson = ({ personData }) => {
  const personCtx = useContext(PersonCtx);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const carsOwnedRef = useRef(null);

  useEffect(() => {
    console.log(personData);
  }, [personData]);

  const submitPersonForm = (e) => {
    e.preventDefault();
    getFormValue();
    personCtx.setIsEditingPerson((prevState) => !prevState);
  };

  const getFormValue = () => {
    personCtx.setPersonFormValue({
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
    console.log('click');
  };

  return (
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
  );
};

export default EditPerson;
