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

const Home = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions.list);
  const budgets = useSelector((state) => state.analytics.items); // fixed selector

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
    <main className="min-h-screen bg-gray-100 p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <AddBudgetCard onAdd={handleBudgetSubmit} />

      <BarChartCard transactions={transactions} budgets={budgets} />

      <TransactionListCard
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <PieChartCard transactions={transactions} />
      <SummaryCard transactions={transactions} />
      <InsightsCard />

      <AddTransactionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleDialogSubmit}
        initialData={editData}
      />
    </main>
  );
};

export default Home;
