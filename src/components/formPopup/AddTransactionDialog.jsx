import React, { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DollarSign, Calendar, Pencil } from 'lucide-react'

const defaultFormState = {
  amount: '',
  date: '',
  description: '',
}

const AddTransactionDialog = ({open, setOpen}) => {
  
  const [formData, setFormData] = useState(defaultFormState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted:', formData)
    // TODO: Send to backend or update global state
    setFormData(defaultFormState)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >

      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add a Transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 w-[60%]">
          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block mb-1 text-sm font-medium">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="$0.00"
                value={formData.amount}
                onChange={handleChange}
                className="pl-10"
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block mb-1 text-sm font-medium">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-1 text-sm font-medium">
              Description
            </label>
            <div className="relative">
              <Pencil className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="e.g. Groceries"
                value={formData.description}
                onChange={handleChange}
                className="pl-10"
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionDialog
