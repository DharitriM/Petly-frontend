import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/lib/interfaces/product';

export interface CartItem extends Product {
  cartQuantity: number;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number; size?: string }>) => {
      const { product, quantity, size } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === product.id && item.selectedSize === size);
      if (existingIndex >= 0) {
        state.items[existingIndex].cartQuantity += quantity;
      } else {
        state.items.push({ ...product, cartQuantity: quantity, selectedSize: size });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.cartQuantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
