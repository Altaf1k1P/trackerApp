import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchBudgetVsActual } from "@/store/analyticsSlice"; // You'll create this thunk

function BudgetVsActualChart() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.analytics.budgetVsActual);

  useEffect(() => {
    dispatch(fetchBudgetVsActual("2025-04")); // You can dynamically change the month
  }, [dispatch]);

  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="font-semibold text-lg mb-4">Budget vs Actual</h2>

        {loading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budgeted" fill="#8884d8" name="Budgeted" />
              <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default BudgetVsActualChart;
