"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "All Tools", href: "/tools" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <nav className="bg-[#121212] text-[#F0F0F0] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#0066FF]" />
            <Link href="/" className="text-xl font-bold tracking-wider text-white">
              Dr<span className="text-[#0066FF]">PDF</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-[#0066FF] transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-[#0066FF] hover:bg-[#0052cc] text-white px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-lg shadow-blue-600/20">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#1E1E1E] border-b border-gray-800 transition-all duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 pt-2">
              <button className="w-full bg-[#0066FF] hover:bg-[#0052cc] text-white px-4 py-2 rounded-md font-medium transition-colors duration-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
