// components/ExpenseForm.js
import React from "react";

const ExpenseForm = ({
  name,
  amount,
  category,
  setName,
  setAmount,
  setCategory,
  onSubmit,
  submitLabel = "Add",
}) => {
  return (
    <div className="w-[90%] mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {submitLabel === "Add" ? "Add New Expense" : "Update Expense"}
      </h2>
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-md p-8"
      >
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          {/* Name */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. Grocery"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Amount */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              placeholder="e.g. 250"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Category */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. Food, Travel"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6 md:pt-0">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all duration-200 w-full"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
