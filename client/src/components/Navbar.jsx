import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({ onCreateClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-1000 bg-white shadow-sm px-6 py-4 rounded-b-xl border-b">
      <div className="flex items-center justify-between">
        {/* Left: Logo & Mobile Menu Icon */}
        <div className="flex items-center gap-3">
          <Menu
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-6 h-6 text-gray-700 md:hidden cursor-pointer"
          />
          <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
            Cashflow
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link
            to="/"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Dashboard
          </Link>
        </div>

        {/* Right: Create Button */}
        <Button
          onClick={onCreateClick}
          className="rounded-full px-5 py-1.5 text-sm font-semibold"
        >
          Create
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {isDropdownOpen && (
        <div className="md:hidden mt-2 animate-slideDown">
          <div className="flex flex-col bg-white shadow rounded-lg p-4 space-y-3 text-sm font-medium text-gray-700">
            <Link
              to="/"
              onClick={() => setIsDropdownOpen(false)}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsDropdownOpen(false)}
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
