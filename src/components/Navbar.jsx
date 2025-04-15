import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({onCreateClick}) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm rounded-b-xl">
      {/* Left: Logo + Brand */}
      <div className="flex items-center space-x-2">
        <Menu className="w-5 h-5 text-black md:hidden" />
        <span className="font-bold text-lg">Cashflow</span>
      </div>

      {/* Center: Nav Links */}
      <div className="hidden md:flex space-x-6 font-medium text-sm text-gray-800">
        <Link >Home</Link>
        <Link>Dashboard</Link>
      </div>

      {/* Right: Create Button + Icons */}
      <div className="flex items-center space-x-4">
        <Button onClick={onCreateClick} className="rounded-xl px-4">Create</Button>
      </div>
    </nav>
  );
}

export default Navbar;
