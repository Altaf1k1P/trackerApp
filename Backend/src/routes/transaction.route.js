import { Router } from "express";
import { addTransaction, 
    updateTransaction, 
    deleteTransaction, 
    getAllTransactions, 
    getRecentTransactions,
    getCategoryBreakdown } from "../controller/transaction.controller.js";

const router = Router()

router.post("/add-transaction", addTransaction);
router.patch("/update-transaction/:transactionId", updateTransaction);
router.delete("/delete-transaction/:transactionId", deleteTransaction);
router.get("/get-transactions", getAllTransactions);
router.get("/recent-transactions", getRecentTransactions);
router.get("/category-breakdown", getCategoryBreakdown);


export default router;