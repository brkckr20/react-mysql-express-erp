import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const basarili = (message) => toast.success(message);


const Bildirim = () => {
    return (
        <ToastContainer>Bildirim</ToastContainer>
    )
}

export default Bildirim