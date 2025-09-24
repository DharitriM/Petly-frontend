import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/lib/interfaces/user';

interface UserState {
  users: User[];
  count: number;
}

const initialState: UserState = {
  users: [],
  count: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      console.log("setUsers", action.payload);
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
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
