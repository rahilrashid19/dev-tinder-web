import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: null,
  },
  reducers: {
    addUsers: (state, action) => {
      return action.payload;
    },
    removeUsers: () => {
      return null;
    },
  },
});
export const { addUsers, removeUsers } = userSlice.actions;
export default userSlice.reducer;
