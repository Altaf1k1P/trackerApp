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
    <Card className="rounded-2xl p-4 md:p-6 col-span-1">
      <CardContent>
        <h2 className="text-base md:text-lg font-semibold mb-4">
          Recent transactions
        </h2>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-[500px] text-sm text-left">
              <thead className="text-muted-foreground border-b">
                <tr>
                  <th className="py-2 px-3 whitespace-nowrap">Date</th>
                  <th className="py-2 px-3 whitespace-nowrap">Description</th>
                  <th className="py-2 px-3 whitespace-nowrap">Category</th>
                  <th className="py-2 px-3 whitespace-nowrap">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-2 px-3 text-blue-500 whitespace-nowrap">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">{tx.description}</td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <Badge variant="secondary" className="font-medium">
                        {tx.category}
                      </Badge>
                    </td>
                    <td className="py-2 px-3 text-gray-600 whitespace-nowrap">
                      ${tx.amount.toFixed(2)}
                    </td>
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
