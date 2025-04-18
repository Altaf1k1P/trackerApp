import React from 'react'
import CategoryBreakdown from '@/components/ui/category-breakdown'
import RecentTransactions from '@/components/recent-transactions'
import BudgetVsActualChart from '@/components/BudgetVsActualChart'
// import {fetchBudgetVsActual} from "@/store/analyticsSlice"

function Dashboard() {
  return (
    <>
    <div className="p-6 space-y-6">
      <CategoryBreakdown />
    </div>
    <div className="p-6 space-y-6">
    <RecentTransactions />
  </div>
  <div className="p-6 space-y-6">
     <BudgetVsActualChart/>
    </div>
    </>
    
   )
}

export default Dashboard

