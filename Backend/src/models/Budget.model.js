import mongoose, { Schema } from 'mongoose';

const budgetSchema = new Schema({
  category: {
    type: String,
    enum: ["Food", "Transport", "Health", "Entertainment", "Shopping", "Others"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // e.g., "2025-04"
    required: true,
  }
}, { timestamps: true });

export const Budget = mongoose.model("Budget", budgetSchema);
