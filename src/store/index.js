import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import questionsReducer from "./questionsSlice";

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  questions: questionsReducer,
});

export const store = configureStore({
  reducer: reducer,
});

