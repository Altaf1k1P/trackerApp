import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const InsightsCard = () => (
  <Card className="col-span-1">
    <CardContent>
      <h2 className="text-xl font-semibold mb-2">Budget Insights</h2>
      <p className="text-gray-600">Coming soon: Budget vs actual tracking.</p>
    </CardContent>
  </Card>
);

export default InsightsCard;
