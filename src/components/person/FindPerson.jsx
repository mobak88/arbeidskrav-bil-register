import { useState, useEffect, useContext } from 'react';
import PersonCtx from '../../contexts/personCtx';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import API_ENDPOINTS from '../../api/endpoints';
import './Person.css';

const FindPerson = () => {
  const [isFindingPerson, setIsFindingPerson] = useState(false);
  const [chosenPerson, setChosenPerson] = useState({});

  const {
    allPersonsData,
    isEditingPerson,
    setIsEditingPerson,
    setUserId,
    personData,
    setPersonData
  } = useContext(PersonCtx);

  useEffect(() => {
    setChosenPerson({ ...personData });
    console.log(chosenPerson);
  }, [personData]);

  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);

  const closeFindPerson = (e) => {
    e.preventDefault();
    setIsFindingPerson((prevState) => !prevState);
  };

  const findPersonHandler = (id) => {
    const newFoundPerson = allPersonsData.filter(
      (person) => person.id === parseInt(id)
    );
    setChosenPerson(...newFoundPerson);
  };

  const updatePersonHandler = () => {
    if (!isEditingPerson) {
      setIsEditingPerson((prevState) => !prevState);
    }
    setUserId(chosenPerson.id);
    const { persons } = data;
    const [person] = persons.filter((user) => user.id === chosenPerson.id);
    setPersonData({ ...person });
  };

  console.log(chosenPerson);

  return (
    <>
      {!isFindingPerson && (
        <div>
          <button onClick={() => setIsFindingPerson((prevState) => !prevState)}>
            Find Person
          </button>
        </div>
      )}
      {isFindingPerson && (
        <>
          <form className='edit-person-form find-person-form' action=''>
            <div className='form-input-container'>
              <label htmlFor='person'>Find a person:</label>
              <select
                name='person'
                id='person'
                onChange={(e) => {
                  findPersonHandler(e.target.value);
                }}
                defaultValue='default'
              >
                <option value={'default'}>Choose a person</option>
                {allPersonsData &&
                  allPersonsData.map((person) => {
                    return (
                      <option key={person.id} value={person?.id}>
                        {person?.firstName} {person?.lastName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <button onClick={closeFindPerson}>Close</button>
          </form>

          {Object.keys(chosenPerson).length !== 0 && (
            <div className='person-container'>
              <div className='information-wrapper'>
                <h3>Found person</h3>
                <p className='first-name'>
                  Name: {chosenPerson?.firstName} {chosenPerson?.lastName}
                </p>
                <p className='age'>Age: {chosenPerson?.age}</p>
              </div>
              {!chosenPerson.carsOwned && (
                <div>
                  <p className='cars-owned'>
                    <b>Cars owned:</b>
                  </p>
                  <p className='cars-owned'>No cars owned</p>
                </div>
              )}
              {chosenPerson.carsOwned &&
                data.cars.map((car) => {
                  if (car.id === parseInt(chosenPerson.carsOwned)) {
                    return (
                      <div key={car.id}>
                        <p className='cars-owned'>
                          <b>Cars owned:</b>
                        </p>
                        <p className='cars-owned'>Make: {car?.make}</p>
                        <p className='cars-owned'>Model: {car?.model}</p>
                      </div>
                    );
                  }
                })}
              <div className='button-wrapper'>
                <button onClick={updatePersonHandler}>Edit</button>
              </div>
              <div className='button-wrapper'>
                <button>Delete</button>
              </div>
              <div className='button-wrapper'>
                <button onClick={() => setChosenPerson({})}>Close</button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FindPerson;
