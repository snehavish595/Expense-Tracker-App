// components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t mt-12 py-5 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        <p className="mb-2 md:mb-0">
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="/about"
            className="hover:text-purple-600 transition-colors"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-purple-600 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
