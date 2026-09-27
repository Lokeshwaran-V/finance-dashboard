import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import goalReducer from "./goalSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    goals: goalReducer,
  },
});