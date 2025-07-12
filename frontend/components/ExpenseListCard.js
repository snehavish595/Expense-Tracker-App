import React, { useState } from "react";
import { formatExpenseDate } from "@/utils/expenseCalculations";

const ITEMS_PER_PAGE = 10;

const ExpenseListCard = ({ title, data, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = [...data]
    .sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date))
    .slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const getCategoryColor = (category) => {
    const map = {
      Food: "bg-green-100 text-green-700",
      Travel: "bg-blue-100 text-blue-700",
      Shopping: "bg-pink-100 text-pink-700",
      Household: "bg-yellow-100 text-yellow-800",
      Other: "bg-gray-200 text-gray-700",
    };
    return map[category] || "bg-purple-100 text-purple-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-[90%] mx-auto mt-10">
      <h3 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">{title}</h3>

      {currentData.length > 0 ? (
        <div className="space-y-2">
          {/* Header */}
          <div className="hidden md:grid grid-cols-5 font-semibold text-gray-500 text-sm border-b pb-2 mb-2 px-2">
            <span>Name</span>
            <span>Category</span>
            <span>Date</span>
            <span className="text-right">Amount (₹)</span>
            <span className="text-right">Actions</span>
          </div>

          {currentData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 hover:shadow transition text-sm md:text-base"
            >
              {/* Name */}
              <span className="font-medium truncate">{item.name || item.label}</span>

              {/* Category as a pill */}
              <span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category || "Uncategorized"}
                </span>
              </span>

              {/* Date */}
              <span className="text-gray-500">
                {formatExpenseDate(item.created_at || item.date)}
              </span>

              {/* Amount */}
              <span className="text-green-600 font-semibold text-right">
                ₹{item.amount?.toFixed(2)}
              </span>

              {/* Actions */}
              <div className="flex justify-end gap-4 text-sm">
                <button
                  onClick={() => onEdit(item.id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-between items-center pt-6 border-t mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No expenses found.</p>
      )}
    </div>
  );
};

export default ExpenseListCard;
