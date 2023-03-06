import axios from 'axios';
import { API_URL } from '../../config/api'
// const API = "http://localhost:3001";
const API = API_URL

export const birimKaydet = async (values) => {
    try {
        const { data } = await axios.post(`${API}/birim`, values);
        return data;
    } catch (error) {
        console.log(error);
    }
}
