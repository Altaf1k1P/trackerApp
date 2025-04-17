// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import analyticsReducer from "./analyticsSlice"

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    analytics: analyticsReducer, // ✅ this must match
  },
});

export default store;
