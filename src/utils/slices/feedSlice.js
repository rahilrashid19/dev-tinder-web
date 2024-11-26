import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feedUsers: null,
  },
  reducers: {
    addToFeed: (state, action) => {
      state.feedUsers = action.payload;
    },
  },
});

export const { addToFeed } = feedSlice.actions;
export default feedSlice.reducer;
