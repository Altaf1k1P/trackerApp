import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const categories = ["Food", "Transport", "Entertainment", "Health", "Other"];

const AddTransactionDialog = ({ open, onClose, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      amount: "",
      date: "",
      category: "Other",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData); // pre-fill form for edit
    } else {
      reset(); // clear form for add
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-2">
          <div>
            <Label>Description</Label>
            <Input
              autoFocus
              placeholder="Description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">Description is required</p>
            )}
          </div>

          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="Amount"
              {...register("amount", { required: true })}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">Amount is required</p>
            )}
          </div>

          <div>
            <Label>Date</Label>
            <Input type="date" {...register("date")} />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category")}
              className="p-2 border rounded w-full"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full">
            {initialData ? "Update" : "Add"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
