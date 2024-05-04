import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jdList: [],
  totalCount: 0,
  jdLoading: false,
};

const JobCardSlice = createSlice({
  name: "JobCardSlice",
  initialState,
  reducers: {
    setJdList: (state, action) => {
      state.jdList = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setJdLoading: (state, action) => {
      state.jdLoading = action.payload;
    },
  },
});

export const { setJdList, setTotalCount, setJdLoading } = JobCardSlice.actions;

export default JobCardSlice.reducer;
