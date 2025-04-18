import { Budget } from '../models/Budget.model.js';
import { Transaction } from '../models/Transaction.model.js';


 const upsertBudget = async (req, res) => {
  try {
    console.log("POST /add-budget called", req.body);

    const { category, amount, month } = req.body;

    if (!category || !amount || !month) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const budget = await Budget.findOneAndUpdate(
      { category, month },
      { amount },
      { upsert: true, new: true }
    );

    return res.status(200).json(budget);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteB = async(req, res)=>{
  try {
    const {_id} = req.params;
    await Budget.findByIdAndDelete(_id)
    return res.status(200).json({message:"deleted!!"})
    
  } catch (error) {
    return res.status(500).json({ message: error.message });

  }
}

// 📄 Get Budgets for a Month
 const getBudgetsByMonth = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required (e.g., 2025-04)" });
    }

    const budgets = await Budget.find({ month });

    return res.status(200).json(budgets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

 const BudgetVsActual = async (req, res) => {
    try {
      const { month } = req.query;
  
      if (!month) {
        return res.status(400).json({ message: "Month is required (format: YYYY-MM)" });
      }
  
      // Create start and end date of the month
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1); // move to next month
  
      // Get budgets
      const budgets = await Budget.find({ month });
  
      // Get actual spending per category within the month
      const actuals = await Transaction.aggregate([
        {
          $match: {
            date: { $gte: start, $lt: end },
          },
        },
        {
          $group: {
            _id: "$category",
            actualSpent: { $sum: "$amount" },
          },
        },
      ]);
  
      // Convert actuals array to map for easy access
      const actualMap = {};
      actuals.forEach((item) => {
        actualMap[item._id] = item.actualSpent;
      });
  
      // Combine budget + actual into one array
      const comparison = budgets.map((budget) => ({
        category: budget.category,
        budgeted: budget.amount,
        actual: actualMap[budget.category] || 0,
      }));
  
      return res.status(200).json(comparison);
    } catch (error) {
      console.error("Budget vs Actual Error:", error);
      return res.status(500).json({ message: error.message });
    }
  };

export {getBudgetsByMonth,upsertBudget, BudgetVsActual,deleteB}
