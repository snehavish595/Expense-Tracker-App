import React from "react";
import { formatExpenseDate } from "@/utils/expenseCalculations";

const ExpenseListCard = ({ title, data, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto mt-6">
    <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">{title}</h3>

    {data && data.length > 0 ? (
      <div className="space-y-5">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {item.name || item.label}
              </p>
              {item.category && (
                <p className="text-sm text-gray-500 mt-1">{item.category}</p>
              )}
              {(item.created_at || item.date) && (
                <p className="text-sm text-gray-400 mt-1">
                  {formatExpenseDate(item.created_at || item.date)}
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-green-600 mb-2">
                ₹{item.amount?.toFixed(2)}
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => onEdit(item.id)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No expenses found.</p>
    )}
  </div>
);

export default ExpenseListCard;
