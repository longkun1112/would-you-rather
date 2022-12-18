import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

export const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authUser: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.userId = "";
    },
  },
});

export const { authUser, logout } = authSlice.actions;

export default authSlice.reducer;
