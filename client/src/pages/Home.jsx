import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  deleteTransaction,
  updateTransaction,
  addTransaction,
} from "../store/transactionSlice.js";

import { addBudget } from "@/store/analyticsSlice.js";

import AddBudgetCard from "@/components/AddBudgetCard";
import BarChartCard from "@/components/BarChartCard";
import PieChartCard from "@/components/PieChartCard";
import SummaryCard from "@/components/SummaryCard";
import InsightsCard from "@/components/InsightsCard";
import TransactionListCard from "@/components/TransactionListCard";
import AddTransactionDialog from "@/components/formPopup/AddTransactionDialog";

// Skeleton card for loading state
const SkeletonCard = () => (
  <div className="animate-pulse col-span-1 h-40 bg-white rounded-xl shadow p-4 space-y-3">
    <div className="h-6 bg-gray-300 rounded w-1/3" />
    <div className="h-4 bg-gray-200 rounded w-2/3" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

const Home = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions.list);
  const budgets = useSelector((state) => state.analytics.items); 
  const loading = useSelector((state) => state.transactions.loading);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = (_id) => {
    dispatch(deleteTransaction(_id));
  };

  const handleEdit = (tx) => {
    setEditData(tx);
    setDialogOpen(true);
  };

  const handleDialogSubmit = (data) => {
    if (editData?._id) {
      dispatch(updateTransaction({ _id: editData._id, updatedData: data })).unwrap();
    } else {
      dispatch(addTransaction(data));
    }

    setEditData(null);
    setDialogOpen(false);
  };

  const handleBudgetSubmit = (data) => {
    dispatch(addBudget(data));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-2 grid gap-6 grid-cols-1 sm:p-6 md:grid-cols-2 lg:grid-cols-3">
      <AddBudgetCard onAdd={handleBudgetSubmit} />
      <InsightsCard />
      {loading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        <>
          <SummaryCard transactions={transactions} />
          <BarChartCard transactions={transactions} budgets={budgets} />
          <PieChartCard transactions={transactions} />
        </>
      )}

    
     

      <AddTransactionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleDialogSubmit}
        initialData={editData}
      />
      <TransactionListCard
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  );
};

export default Home;
