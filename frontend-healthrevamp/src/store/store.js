import { configureStore } from "@reduxjs/toolkit";
import actionCreatorReducer from "../slice/slice";

export const store = configureStore({
  reducer: {
    user: actionCreatorReducer,
  },
});
