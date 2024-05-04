import { configureStore } from "@reduxjs/toolkit";
import JobBoardReducer from "./jobBoard";
import JobCardReducer from "./jobCard";

export const store = configureStore({
  reducer: {
    JobBoardReducer,
    JobCardReducer,
  },
});
