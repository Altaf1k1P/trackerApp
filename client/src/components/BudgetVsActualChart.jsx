import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchBudgetVsActual } from "@/store/analyticsSlice";
import FilterControls from "./FilterControls.jsx";

function BudgetVsActualChart() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.analytics.budgetVsActual);

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    dispatch(fetchBudgetVsActual(selectedMonth));
  }, [dispatch, selectedMonth]);

  return (
    <Card className="rounded-2xl p-6 shadow-sm bg-white">
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-4 flex-col sm:flex-row gap-1 sm:gap-0">
          <h2 className="text-lg font-semibold text-gray-800">Budget vs Actual</h2>
          <FilterControls
            value={selectedMonth}
            onChange={setSelectedMonth}
            onFilter={() => dispatch(fetchBudgetVsActual(selectedMonth))}
          />
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="w-full overflow-x-auto">
            <div style={{ minWidth: 300 }}>
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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default BudgetVsActualChart;
