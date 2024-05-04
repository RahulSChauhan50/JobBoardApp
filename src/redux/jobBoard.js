import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rolesFilter: [],
  numberofEmployessFilter: [],
  experienceFilter: [],
  remoteFilter: [],
  minimumSalaryFilter: [],
  companyName: "",
};

const JobBoardSlice = createSlice({
  name: "JobBoardSlice",
  initialState,
  reducers: {
    setRolesFilter: (state, action) => {
      state.rolesFilter = action.payload;
    },
    setNumberofEmployessFilter: (state, action) => {
      state.numberofEmployessFilter = action.payload;
    },
    setExperienceFilter: (state, action) => {
      state.experienceFilter = action.payload;
    },
    setRemoteFilter: (state, action) => {
      state.remoteFilter = action.payload;
    },
    setMinimumSalaryFilter: (state, action) => {
      state.minimumSalaryFilter = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
  },
});

export const {
  setRolesFilter,
  setNumberofEmployessFilter,
  setExperienceFilter,
  setRemoteFilter,
  setMinimumSalaryFilter,
  setCompanyName,
} = JobBoardSlice.actions;

export default JobBoardSlice.reducer;
