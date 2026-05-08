import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import searchReducer from './slices/searchSlice';
import brandReducer from './slices/brandSlice';
import categoryReducer from './slices/categorySlice';
import petTypeReducer from './slices/petTypeSlice';
import helpReducer from './slices/helpSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        search: searchReducer,
        brand: brandReducer,
        category: categoryReducer,
        petType: petTypeReducer,
        help: helpReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
    },
})


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']