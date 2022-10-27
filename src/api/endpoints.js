const BASE_URL = import.meta.env.VITE_API_URL;


const API_ENDPOINTS = {
    all: `${BASE_URL}`,
    person: function(id) {
        return `${BASE_URL}/person/${id}`;
    },
    car: function(id) {
        return `${BASE_URL}/car/${id}`;
    },
};
export default API_ENDPOINTS;