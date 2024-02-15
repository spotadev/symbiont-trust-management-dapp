import { configureStore } from "@reduxjs/toolkit"
import nextIdManagementReducer from "./slices/nextIdManagementSlice"
import githubHandleReducer from "./slices/githubHandleSlice"
import xHandleReducer from "./slices/xHandleSlice";

export const store = configureStore({
  reducer: {
    nextIdManagement: nextIdManagementReducer,
    githubHandle: githubHandleReducer,
    xHandle: xHandleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
