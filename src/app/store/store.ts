import { configureStore } from "@reduxjs/toolkit"
import nextIdManagementReducer from "./slices/nextIdManagementSlice"
import githubHandleReducer from "./slices/githubHandleSlice"
import xHandleReducer from "./slices/xHandleSlice";
import utuReducer from "./slices/utuSlice";

export const store = configureStore({
  reducer: {
    nextIdManagement: nextIdManagementReducer,
    githubHandle: githubHandleReducer,
    xHandle: xHandleReducer,
    utu: utuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
