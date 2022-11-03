import { useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import API_ENDPOINTS from '../../api/endpoints';
import { deleteFromAPI, updateToAPI } from '../../helpers/httpReuqests';
import './Car.css';

const Car = () => {
  const [carFormValue, setCarFormValue] = useState({});
  const [carId, setCarId] = useState(null);
  const [isEditingCar, setIsEditingCar] = useState(false);
  const [carData, setCarData] = useState({});
  const [allCars, setAllCars] = useState([]);
  const { data, fetchError, isLoading } = useAxiosFetch(`${API_ENDPOINTS.all}`);

  useEffect(() => {
    if (data.cars) {
      console.log(data);
      setAllCars([...data.cars]);
    }
  }, [data]);

  useEffect(() => {
    if (carId) {
      updateToAPI(carFormValue, `${API_ENDPOINTS.car(carId)}`);

      setAllCars((prevState) => {
        const newState = prevState.map((car) => {
          if (car.id === carId) {
            return { ...carFormValue, id: carId };
          }
          return car;
        });
        return [...newState];
      });

      setCarData({});
    }
  }, [carFormValue]);

  useEffect(() => {
    if (data?.cars) {
      const { cars } = data;
      const [car] = cars.filter((car) => car.id === carId);
      setCarData(car);
    }
  }, [carId]);

  const updateCarHandler = (carId) => {
    setUserId(carId);
    setIsEditingCar((prevState) => !prevState);
    const { cars } = data;
    const [car] = cars.filter((car) => car.id === carId);
    setCarData(car);
  };

  const deleteCarHandler = (id) => {
    deleteFromAPI(`${API_ENDPOINTS.car(carId)}`);
    setAllCars((prevState) => prevState.filter((car) => car.id !== id));
  };

  return (
    <div className='car-wrapper'>
      {allCars &&
        allCars.map((car) => {
          return (
            <div className='car-container' key={car.id}>
              <h3>Information</h3>
              <p>Brand: {car?.make} </p>
              <p>Model: {car?.model}</p>
              <p>Year: {car?.year}</p>
              <p>Owner</p>
              <div className='button-wrapper'>
                <button onClick={() => updateCarHandler(car.id)}>Edit</button>
              </div>
              <div className='button-wrapper'>
                <button onClick={() => deleteCarHandler(car.id)}>Delete</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Car;
