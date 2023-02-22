import axios from 'axios';
import { API_URL } from '../config/api';

// const API = "http://localhost:3001";
const API = API_URL


export const cariGetir = async () => {
    try {
        const { data } = await axios.get(`${API}/cari`);
        return data;
    } catch (error) {
        console.log(error);
    }
}