import axios from "axios"

export const getCatalogues = () => {
    let result  = []
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = axios.get(`${backendUrl}/catalogues?item=null&page=1&limit=10`)
        .catch(error => {
            console.error('Error fetching catalogues:', error);
            // Handle the error as needed
        });
        result= response.data
        return result
};
