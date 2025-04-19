import React from "react";
import { Button } from "@/components/ui/button";

function FilterControls({ value, onChange, onFilter }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <input
        type="month"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1 text-sm w-full sm:w-auto"
      />
      <Button size="sm" onClick={onFilter}>
        Filter
      </Button>
    </div>
  );
}

export default FilterControls;
