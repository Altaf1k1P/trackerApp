import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const SummaryCard = ({ transactions }) => (
  <Card className="col-span-1">
    <CardContent>
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      <div className="grid gap-2">
        <div>Total: ₹{transactions.reduce((acc, t) => acc + t.amount, 0)}</div>
        <div>Recent: {transactions[transactions.length - 1]?.description}</div>
      </div>
    </CardContent>
  </Card>
);

export default SummaryCard;
