import mongoose, { isValidObjectId, trusted } from "mongoose";
import { Transaction } from "../models/Transaction.model.js";

//add
const addTransaction = async(req, res)=>{
    
    try {
        const {amount: rawAmount, date, description, category} = req.body;
        if(!rawAmount || !date ||!description || !category){
            return res.status(400).json({message:'All field are required!'})
        }
       const amount = Number(rawAmount);
        if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Amount must be a number > 0" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }
         const transaction = await Transaction.create({
            amount,
            date,
            description,
            category,
         })

         return res.status(201).json(transaction)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
}

const updateTransaction = async(req, res)=>{
  try {
    const {transactionId} = req.params;
    const {amount, date, description, category} = req.body;
    if(!isValidObjectId(transactionId)){
        return res.status(404).json({ message: "Invalid Transaction ID format" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, {amount, date, description, category},{new: true} )

    if(!updatedTransaction){
        return res.status(404).json({ message: "transaction update fail" });
    }

    return res.status(200).json({message:"Transaction Update successfully!!", updatedTransaction})

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteTransaction = async(req, res)=>{
    try {
        const {transactionId} = req.params;
        if(!isValidObjectId(transactionId)){
            return res.status(404).json({ message: "Invalid Transaction ID format" });
        }
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
          }
        return res.status(200).json({message:"Transaction Delete successfully!!"})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Get All Transactions
const getAllTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find().sort({ date: -1 }); // sort by latest first
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  const getRecentTransactions = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 5; // default to 5 if not provided
  
      const transactions = await Transaction.find()
        .sort({ date: -1 }) // latest first
        .limit(limit);
  
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
 const getCategoryBreakdown = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const match = {};
    if (startDate || endDate) {
      match.date = {};
      if (startDate) match.date.$gte = new Date(startDate);
      if (endDate) match.date.$lte = new Date(endDate);
    }

    const breakdown = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      },
      { $sort: { total: -1 } }
    ]);

    return res.status(200).json(breakdown);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

  

export{
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getAllTransactions,
    getRecentTransactions,
    getCategoryBreakdown
}