import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    emergencyContacts: [],
    helplines: [],
    faqs: [],
    loading: false,
    error: null,
};

const helpSlice = createSlice({
    name: 'help',
    initialState,
    reducers: {
        setEmergencyContacts: (state, action) => {
            state.emergencyContacts = action.payload;
        },
        setHelplines: (state, action) => {
            state.helplines = action.payload;
        },
        setFaqs: (state, action) => {
            state.faqs = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setEmergencyContacts, setHelplines, setFaqs, setLoading, setError } = helpSlice.actions;

export default helpSlice.reducer;
