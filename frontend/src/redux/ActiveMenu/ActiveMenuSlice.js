import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    menuListesi: [
        {
            id: 1,
            isim: "Malzeme Giriş",
            link: "/malzeme-giris"
        },
        {
            id: 2,
            isim: "Firma Kartı",
            link: "/firma-karti"
        },
        {
            id: 3,
            isim: "Birim Kodlama",
            link: "/birim-kodlama"
        }
    ],
}

export const activeMenuSlice = createSlice({
    name: "activeMenu",
    initialState,
    reducers: {
        removeMenu: (state, action) => {

            const index = state.menuListesi.findIndex(obj => obj.id === action.payload);
            const nextMenu = state.menuListesi[index - 1];
            state.menuListesi.splice(index, 1);
        },
    },
    extraReducers: {},
})

export const { removeMenu } = activeMenuSlice.actions;
export default activeMenuSlice.reducer;