import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, RefreshCcw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TransactionListCard = ({ transactions, onDelete, onEdit }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>
        <p className="text-sm text-gray-500 mb-4">
          This is your list of transactions. You can edit or delete each transaction directly from the list.
        </p>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t._id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded">
                  <RefreshCcw className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{t.description}</div>
                  <div className="text-sm text-gray-500">₹{t.amount.toFixed(2)}</div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(t)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(t._id)}>
                    <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionListCard;
