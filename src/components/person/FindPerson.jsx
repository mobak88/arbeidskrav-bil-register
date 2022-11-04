import { useState, useEffect, useContext } from 'react';
import PersonCtx from '../../contexts/personCtx';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import API_ENDPOINTS from '../../api/endpoints';
import './Person.css';

const FindPerson = () => {
  const [isFIndingPerson, setIsFindingPerson] = useState(false);
  const [chosenPerson, setChosenPerson] = useState('');

  const personCtx = useContext(PersonCtx);
  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  const closeFindPerson = (e) => {
    e.preventDefault();
    setIsFindingPerson((prevState) => !prevState);
  };

  console.log(chosenPerson);

  return (
    <>
      {!isFIndingPerson && (
        <div>
          <button onClick={() => setIsFindingPerson((prevState) => !prevState)}>
            Find Person
          </button>
        </div>
      )}
      {isFIndingPerson && (
        <form className='edit-person-form' action=''>
          <div className='form-input-container'>
            <label htmlFor='person'>Find a person:</label>
            <select
              name='person'
              id='person'
              onChange={(e) => {
                setChosenPerson(e.target.value);
              }}
              defaultValue='default'
            >
              <option value={'default'}>Choose a person</option>
              {data.persons &&
                data.persons.map((person) => {
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
      )}
    </>
  );
};

export default FindPerson;
