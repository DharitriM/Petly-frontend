import { brand } from "@/lib/interfaces/brand";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BrandState {
    brands: brand[];
    count: number;
}

const initialState: BrandState = {
    brands: [],
    count: 0,
};

const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        setBrands: (state, action: PayloadAction<brand[]>) => {
            state.brands = action.payload;
            state.count = action.payload.length;
        },
        addBrand: (state, action: PayloadAction<brand>) => {
            state.brands.push(action.payload);
            state.count += 1;
        },
        updateBrand: (state, action: PayloadAction<brand>) => {
            const index = state.brands.findIndex((b: any) => b.id === action.payload.id);
            if (index !== -1) {
                state.brands[index] = action.payload;
            }
        },
        deleteBrand: (state, action: PayloadAction<string>) => {
            state.brands = state.brands.filter((b: any) => b.id !== action.payload);
            state.count -= 1;
        },
    },
});

export const { setBrands, addBrand, updateBrand, deleteBrand } = brandSlice.actions;
export default brandSlice.reducer;

export const brandSliceActions = () => ({
    setBrands: (brands: brand[]) => {
        return { type: brandSlice.actions.setBrands.type, payload: brands };
    },
});