import axios from 'axios';

const API = "http://localhost:3001";

export const cariKaydet = async (values) => {
    try {
        const { data } = await axios.post(`${API}/cari`, values);
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const ulkeGetir = async () => {
    try {
        const { data } = await axios.get(`${API}/ulke`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const ulkeKaydet = async (values) => {
    try {
        const { data } = await axios.post(`${API}/ulke`, values);
        return data;
    } catch (error) {
        console.log(error);
    }
}