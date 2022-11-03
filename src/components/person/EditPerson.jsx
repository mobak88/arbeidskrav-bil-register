import { useRef, useContext } from 'react';
import PersonCtx from '../../contexts/personCtx';
import './Person.css';

const EditPerson = ({ personData }) => {
  const personCtx = useContext(PersonCtx);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const carsOwnedRef = useRef(null);

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
        <label htmlFor='cars-owned'>Cars Owned:</label>
        <input
          type='text'
          id='cars-owned'
          ref={carsOwnedRef}
          defaultValue={personData?.carsOwned || ''}
          onChange={(e) => {
            carsOwnedRef.current = e.target.value;
          }}
        />
      </div>
      <button onClick={submitPersonForm}>Update</button>
      <button onClick={cancelUpdate}>Cancel</button>
    </form>
  );
};

export default EditPerson;
