import useAxiosFetch from '../../hooks/useAxiosFetch';
import API_ENDPOINTS from '../../api/endpoints';
import './Person.css';

const Person = () => {
  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);

  if (data) {
    console.log(data.persons);
  }

  return (
    <div className="persons-container">
      {data &&
        data.persons?.map((person) => {
          return (
            <div className='person-wrapper' key={person.id}>
              <h3>Information</h3>
              <p className='first-name'>{person?.firstName}</p>
              <p className='last-name'>{person?.lastName}</p>
              <p className='age'>{person?.age}</p>
              <p className='cars-owned'>{person?.carsOwned}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Person;
