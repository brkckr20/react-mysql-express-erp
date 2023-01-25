import axios from 'axios';

const API = "http://localhost:3001";

export const getData = async () => {
    try {
        const { data } = await axios.get(`${API}/malzemekarti`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const setData = async (values) => {
    try {
        const { data } = await axios.post(`${API}/malzemekarti`, values);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const malzemeGirisKaydet = async (values, kalem, tip) => {
    try {
        const { data } = await axios.post(`${API}/malzemedepo1/${tip}`, { values, kalem });
        return data;
    } catch (error) {
        console.log(error);
    }
}

/* birim getir */

export const birimGetir = async () => {
    try {
        const { data } = await axios.get(`${API}/birim`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

/* cari getir */
export const cariGetir = async () => {
    try {
        const { data } = await axios.get(`${API}/cari`);
        return data;
    } catch (error) {
        console.log(error);
    }
}
