import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const categories = ["Food", "Transport", "Entertainment", "Health", "Shopping", "Others"];

const AddBudgetCard = ({ onAdd }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Budget added:", data);
    const newBudget = {
      id: Date.now(),
      amount: parseFloat(data.amount),
      category: data.category,
      month: data.month, // example: "2025-04"
    };
    onAdd(newBudget);
    reset();
  };

  return (
    <Card className="col-span-1 p-4">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Add Category Budget</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <select {...register("category", { required: true })} className="p-2 border rounded">
            <option value="">Select Category</option>
            {categories.map((cat) => <option key={cat}>{cat}</option>)}
          </select>
          {errors.category && <span className="text-red-500 text-sm">Category is required</span>}

          <input
            {...register("amount", { required: true })}
            type="number"
            placeholder="Monthly Budget Amount"
            className="p-2 border rounded"
          />
          {errors.amount && <span className="text-red-500 text-sm">Amount is required</span>}

          <input
            {...register("month", { required: true })}
            type="month"
            className="p-2 border rounded"
          />
          {errors.month && <span className="text-red-500 text-sm">Month is required</span>}

          <Button type="submit">Add Budget</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddBudgetCard;
