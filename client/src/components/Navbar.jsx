import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({ onCreateClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between sticky top-0 px-6 py-4 bg-white shadow-sm rounded-b-xl">
      {/* Left: Logo + Brand */}
      <div className="flex items-center space-x-2">
        <Menu
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="w-5 h-5 text-black md:hidden cursor-pointer"
        />
        <span className="font-bold text-lg">Cashflow</span>
      </div>

      {/* Center: Nav Links (desktop) */}
      <div className="hidden md:flex space-x-6 font-medium text-sm text-gray-800">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      {/* Right: Create Button */}
      <div className="flex items-center space-x-4">
        <Button onClick={onCreateClick} className="rounded-xl px-4">Create</Button>
      </div>

      {/* Dropdown Menu (mobile) */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-b-xl md:hidden z-10">
          <div className="flex flex-col space-y-2 p-4 text-sm text-gray-800 font-medium">
            <Link to="/" onClick={() => setIsDropdownOpen(false)}>Home</Link>
            <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)}>Dashboard</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
