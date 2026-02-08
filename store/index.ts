import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import searchReducer from './slices/searchSlice';
import brandReducer from './slices/brandSlice';
import categoryReducer from './slices/categorySlice';
import petTypeReducer from './slices/petTypeSlice';
import helpReducer from './slices/helpSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        search: searchReducer,
        brand: brandReducer,
        category: categoryReducer,
        petType: petTypeReducer,
        help: helpReducer,
    },
})


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']