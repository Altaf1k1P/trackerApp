import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axio from "../helper/axios";

// Thunks
export const fetchBudgetVsActual = createAsyncThunk(
  "analytics/fetchBudgetVsActual",
  async (month) => {
    const res = await axio.get(`/budget-vs-actual?month=${month}`);
    return res.data;
  }
);

export const fetchBudgets = createAsyncThunk(
  "analytics/fetchBudgets",
  async () => {
    const res = await axio.get("/api/budgets");
    return res.data;
  }
);

export const addBudget = createAsyncThunk(
  "analytics/addBudget",
  async (budgetData) => {
    const res = await axio.post("/api/add-budget", budgetData);
    return res.data;
  }
);

// Slice
const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    items: [],
    loading: false,
    error: null,
    budgetVsActual: {
      data: [],
      loading: false,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Budget vs Actual
      .addCase(fetchBudgetVsActual.pending, (state) => {
        state.budgetVsActual.loading = true;
        state.budgetVsActual.error = null;
      })
      .addCase(fetchBudgetVsActual.fulfilled, (state, action) => {
        state.budgetVsActual.loading = false;
        state.budgetVsActual.data = action.payload;
      })
      .addCase(fetchBudgetVsActual.rejected, (state, action) => {
        state.budgetVsActual.loading = false;
        state.budgetVsActual.error = action.error.message;
      })

      // Fetch Budgets
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Budget
      .addCase(addBudget.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default analyticsSlice.reducer;
