import { configureStore } from '@reduxjs/toolkit'
import activeMenuSlice from './ActiveMenu/ActiveMenuSlice'

export const store = configureStore({
    reducer: {
        activeMenu: activeMenuSlice
    },
})