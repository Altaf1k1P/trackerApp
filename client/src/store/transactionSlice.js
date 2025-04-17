// src/store/transactionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axio from "../helper/axios.js";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async () => {
    const res = await axio.get("/get-transactions");
    console.log("res",res.data);
    return res.data;
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transactionData) => {
    const res = await axio.post("/add-transaction", transactionData);
    console.log("res add",res.data);    
    return res.data;
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (_id) => {
    await axio.delete(`/delete-transaction/${_id}`);
    return _id;
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ _id, updatedData }) => {
    const res = await axio.patch(`/update-transaction/${_id}`, updatedData);
    console.log("res update",res.data);    
    return res.data;
  }
);

export const recentTransactions = createAsyncThunk(
  "transactions/recent",
  async (transactionData) => {
    const res = await axio.get("/recent-transactions", transactionData);
    console.log("res add",res.data);    
    return res.data;
  }
);

export const categoryBreakdown = createAsyncThunk(
  "category-breakdown",
  async (transactionData) => {
    const res = await axio.get("/category-breakdown", transactionData);
    console.log("res add",res.data);    
    return res.data;
  }
);

// 🧠 Slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    recent: [],
    breakdown: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //category-breakdown
      .addCase(categoryBreakdown.fulfilled, (state, action) => {
        state.loading = false;
        state.breakdown = action.payload;
      })


      // add
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // delete
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      })

      //recent
      .addCase(recentTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.recent = action.payload;
      })
      

      // update
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default transactionSlice.reducer;
