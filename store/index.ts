import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import productReducer from './productSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
})


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']