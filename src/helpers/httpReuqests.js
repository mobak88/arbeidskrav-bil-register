import axios from 'axios';

export const deleteFromAPI = async (endpoint) => {
    try {
        await axios.delete(endpoint);
    } catch (error) {
        console.error(error);
    }
};

export const updateToAPI = async (data, endpoint) => {
    console.log(endpoint);
    try {
        await axios.put(endpoint, {
            ...data
        });
    } catch (error) {
        console.error(error);
    }
};