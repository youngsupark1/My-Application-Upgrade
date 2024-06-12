import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../redux/slices/authSlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

export default store;
