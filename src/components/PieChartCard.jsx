import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const categories = ["Food", "Transport", "Entertainment", "Health", "Other"];
const categoryColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const PieChartCard = ({ transactions }) => {
  const pieData = categories.map((cat) => ({
    name: cat,
    value: transactions
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0),
  }));

  return (
    <Card className="col-span-1">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Category Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartCard;
