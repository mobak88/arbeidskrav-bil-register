import API_ENDPOINTS from '../../api/endpoints';
import useFetch from '../../hooks/useFetch';



const person = () => {

    const { loading, error, data } = useFetch(`${API_ENDPOINTS}`);
    return (
      <div>
        <h3>User information:</h3>
        <p>Fornavn</p>
        <p>Etternavn</p>
        <p>Alder</p>
        <p>Bilmerke</p>
      </div>
    );
  };
  
  export default person;