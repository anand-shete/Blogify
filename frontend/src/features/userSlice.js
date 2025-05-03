import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
    email: null,
    profileImageURL: null,
    role: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profileImageURL = action.payload.profileImageURL;
      state.role = action.payload.role;
    },
    clearUser: (state, action) => {
      state.name = null;
      state.email = null;
      state.profileImageURL = null;
      state.role = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
