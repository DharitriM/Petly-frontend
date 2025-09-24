import { Category } from "@/lib/interfaces/category";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
    categories: Category[];
    count: number;
}

const initialState: CategoryState = {
    categories: [],
    count: 0,
}; 

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
            state.count = action.payload.length;
        },
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
            state.count += 1;
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex((c: any) => c.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter((c: any) => c.id !== action.payload);
            state.count -= 1;
        },
    },
})

export const { setCategories, addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;