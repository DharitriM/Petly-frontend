import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/lib/interfaces/user';

interface UserState {
  users: User[];
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  count: 0,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.count = action.payload.length;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.count += 1;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      state.count -= 1;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
