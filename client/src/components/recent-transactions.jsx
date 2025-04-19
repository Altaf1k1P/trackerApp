import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recentTransactions } from "@/store/transactionSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function RecentTransactions() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.recent);
  const loading = useSelector((state) => state.transactions.loading);

  useEffect(() => {
    dispatch(recentTransactions());
  }, [dispatch]);

  return (
    <Card className="rounded-2xl p-6 shadow-sm bg-white">
    <CardContent className="p-0">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
  
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Description</th>
                <th className="py-2">Category</th>
                <th className="py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100 transition">
                  <td className="py-3 text-blue-600">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td>{tx.description}</td>
                  <td>
                    <Badge variant="secondary" className="font-medium">
                      {tx.category}
                    </Badge>
                  </td>
                  <td className="text-gray-600 font-medium">${tx.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CardContent>
  </Card>
  
  );
}

export default RecentTransactions;
