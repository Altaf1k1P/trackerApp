import React from 'react'
import CategoryBreakdown from '@/components/ui/category-breakdown'
import RecentTransactions from '@/components/recent-transactions'
import BudgetVsActualChart from '@/components/BudgetVsActualChart'

function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-2 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CategoryBreakdown />
        <RecentTransactions />
        <BudgetVsActualChart />
      </div>
    </main>
  )
}

export default Dashboard
