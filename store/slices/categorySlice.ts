import { Category } from "@/lib/interfaces/category";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
    categories: Category[];
    count: number;
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    count: 0,
    loading: false,
    error: null,
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
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
})

export const { setCategories, addCategory, updateCategory, deleteCategory, setLoading, setError } = categorySlice.actions;
export default categorySlice.reducer;