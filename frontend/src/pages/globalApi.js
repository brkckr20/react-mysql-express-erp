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

export const dbGetir = async () => {
    try {
        const { data } = await axios.get(`${API}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const birimGetir = async () => {
    try {
        const { data } = await axios.get(`${API}/birim`);
        return data;
    } catch (error) {
        console.log(error)
    }
}


/* kalem islem getir */
export const kalemIslemGetir = async (depoAdi) => {
    try {
        const { data } = await axios.get(`${API}/kalem-islem/${depoAdi}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}