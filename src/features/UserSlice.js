import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userEmail: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    },
    setUserLogoutState: (state) => {
      state.userName = null;
      state.userEmail = null;
    },
  },
});

export const { setActiveUser, setUserLogoutState } = UserSlice.actions;

export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;

export default UserSlice.reducer;
