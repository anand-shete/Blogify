import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setAllBlogs: (state, action) => {
      action.payload.forEach((newBlog) => {
        const exists = state.some((blog) => blog._id === newBlog._id);
        if (!exists) state.push(newBlog);
      });
    },
    clearAllBlogs: (state, action) => {
      console.log("dtate", JSON.stringify(state, null, 2));
      state = [];
      console.log("dtate", JSON.stringify(state, null, 2));
    },
    setComments: (state, action) => {
      console.log(JSON.stringify(action.payload, null, 2));
    },
  },
});

export const { setAllBlogs, clearAllBlogs, setComments } = blogSlice.actions;
export default blogSlice.reducer;
