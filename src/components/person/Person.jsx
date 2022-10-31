import useAxiosFetch from '../../hooks/useAxiosFetch';
import API_ENDPOINTS from '../../api/endpoints';

const Person = () => {
  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);

  if (data) {
    console.log(data.persons);
  }

  return (
    <>
      {data !== undefined &&
        data.persons.map((person) => {
          return (
            <div key={person.id}>
              <h3>Information</h3>
              <p>{person.firstName}</p>
              <p>{person.lastName}</p>
              <p>{person.age}</p>
              <p>{person.carsOwned}</p>
            </div>
          );
        })}
    </>
  );
};

export default Person;
