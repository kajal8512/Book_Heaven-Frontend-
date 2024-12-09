import { createSlice } from "@reduxjs/toolkit";

const initialRole = localStorage.getItem("role") || "user";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    role: initialRole,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      const role = action.payload;
      state.role = role;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
