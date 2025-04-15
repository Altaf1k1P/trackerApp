import { Type } from 'lucide-react';
import mongoose, {Schema} from 'mongoose';

const transactionSchema = new Schema({
    amount:{ type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  category: {
    type: String, 
    enum: ["Food", "Transport", "Health", "Entertainment", "Shopping", "Others"],
    default: "Food"
  }
})

export const Transaction = mongoose.model("Transaction", transactionSchema)
