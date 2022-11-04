import { useRef, useContext, useEffect } from 'react';
import PersonCtx from '../../contexts/personCtx';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import API_ENDPOINTS from '../../api/endpoints';
import './Person.css';
import { useState } from 'react';

const EditPerson = ({ personData }) => {
  const personCtx = useContext(PersonCtx);
  const [chosenCar, setChosenCar] = useState('');

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);

  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);

  useEffect(() => {
    if (data.cars) {
      console.log(data);
    }
  }, [data]);

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
      carsOwned: chosenCar !== 'default' ? chosenCar : personData.carsOwned
    });
  };

  const cancelUpdate = (e) => {
    e.preventDefault();
    personCtx.setIsEditingPerson((prevState) => !prevState);
  };

  return (
    <form className='edit-person-form' action=''>
      <div className='form-input-container'>
        <label htmlFor='first-name'>First Name:</label>
        <input
          type='text'
          id='first-Name'
          ref={firstNameRef}
          defaultValue={personData?.firstName || ''}
          onChange={(e) => {
            firstNameRef.current = e.target.value;
          }}
        />
      </div>
      <div className='form-input-container'>
        <label htmlFor='last-name-input'>Last Name:</label>
        <input
          type='text'
          id='last-name'
          ref={lastNameRef}
          defaultValue={personData?.lastName || ''}
          onChange={(e) => {
            lastNameRef.current = e.target.value;
          }}
        />
      </div>
      <div className='form-input-container'>
        <label htmlFor='age-input'>Age:</label>
        <input
          type='number'
          id='age'
          ref={ageRef}
          defaultValue={personData?.age || ''}
          onChange={(e) => {
            ageRef.current = e.target.value;
          }}
        />
      </div>
      <div className='form-input-container'>
        <label htmlFor='cars-owned'>Choose a car:</label>
        <select
          name='cars-owned'
          id='cars-owned'
          onChange={(e) => {
            setChosenCar(e.target.value);
          }}
          defaultValue='default'
        >
          <option value={'default'}>Choose car</option>
          {data.cars &&
            data.cars.map((car) => {
              return (
                <option key={car.id} value={car?.id}>
                  {car?.make}
                </option>
              );
            })}
        </select>
      </div>
      <button onClick={submitPersonForm}>Update</button>
      <button onClick={cancelUpdate}>Cancel</button>
    </form>
  );
};

export default EditPerson;
