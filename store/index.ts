import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        search: searchReducer,
    },
})


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']