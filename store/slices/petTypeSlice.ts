import { pet_type } from "@/lib/interfaces/pet_type";
import { createSlice } from "@reduxjs/toolkit";

interface petTypeState {
    petTypes: pet_type[];
    count: number;
    loading: boolean;
    error: string | null;
}

const initialState: petTypeState = {
    petTypes: [],
    count: 0,
    loading: false,
    error: null,
};

const petTypeSlice = createSlice({
    name: "petType",
    initialState,
    reducers: {
        setPetTypes: (state, action) => {
            state.petTypes = action.payload;
            state.count = action.payload.length;
        },
        addPetType: (state, action) => {
            state.petTypes.push(action.payload);
            state.count += 1;
        },
        updatePetType: (state, action) => {
            const index = state.petTypes.findIndex((p: any) => p.id === action.payload.id);
            if (index !== -1) {
                state.petTypes[index] = action.payload;
            }
        },
        deletePetType: (state, action) => {
            state.petTypes = state.petTypes.filter((p: any) => p.id !== action.payload);
            state.count -= 1;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setPetTypes, addPetType, updatePetType, deletePetType, setLoading, setError } = petTypeSlice.actions;
export default petTypeSlice.reducer;