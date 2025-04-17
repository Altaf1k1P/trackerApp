import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryBreakdown } from "@/store/transactionSlice";
import { Card, CardContent } from "@/components/ui/card";

function CategoryBreakdown() {
  const dispatch = useDispatch();
  const breakdown = useSelector((state) => state.transactions.breakdown);
  const loading = useSelector((state) => state.transactions.loading);

  useEffect(() => {
    dispatch(categoryBreakdown());
  }, [dispatch]);

  const total = breakdown.reduce((sum, item) => sum + item.total, 0);

  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="font-semibold text-lg mb-2">Spending breakdown</h2>
        <p className="text-sm text-gray-500 mb-4">This Month</p>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-3">
            {breakdown.map((category, index) => {
              const percent = total ? ((category.total / total) * 100).toFixed(1) : 0;
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>{category.category}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CategoryBreakdown;
