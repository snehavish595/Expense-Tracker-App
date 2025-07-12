// components/Header.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-40 w-full">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Expense Tracker Logo"
            width={40}
            height={40}
            className="rounded-full border p-1"
          />
          <span className="text-xl font-bold text-purple-700">Expense Tracker</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium transition">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium transition">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
