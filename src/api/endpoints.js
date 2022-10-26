const BASE_URL_PERSON = import.meta.env.VITE_API_URL_PERSON;
const BASE_URL_CAR = import.meta.env.VITE_API_URL_PERSON;

const API_ENDPOINTS = {
    all: `${BASE_URL_PERSON}`,
    person: function(id) {
        return `${BASE_URL_PERSON}/person/${id}`;
    },
    car: function(id) {
        return `${BASE_URL_CAR}/car/${id}`;
    },
};

export default API_ENDPOINTS;