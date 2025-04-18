import {Router} from 'express';
import { upsertBudget, getBudgetsByMonth, BudgetVsActual, deleteB } from '../controller/budget.controller.js';

const router = Router();

router.post("/add-budget", upsertBudget);
router.get('/budgets', getBudgetsByMonth);
router.get('/budget-vs-actual', BudgetVsActual);
router.delete('/:_id', deleteB);


export default router;
