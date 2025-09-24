import { Product } from '@/lib/interfaces/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
  count: number;
}

const initialState: ProductState = {
  products: [],
  count: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.count = action.payload.length;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.count += 1;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p: any) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p: any) => p.id !== action.payload);
      state.count -= 1;
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
