"use client";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Header from "@/components/Header";
import ExpenseListCard from "@/components/ExpenseListCard"; // Import the new component

// Helper function to format date
const formatExpenseDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// Component for displaying expense summary cards (already exists, no change)
const ExpenseSummaryCard = ({ title, amount }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start min-w-[430px] max-w-[300px] flex-grow transition-transform transform hover:scale-105 duration-300 ease-in-out border border-gray-200">
    <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
      {title}
    </h3>
    <p className="text-2xl font-bold text-green-600">₹{amount}</p>
  </div>
);

export default function Home() {
  const [userExpenses, setUserExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [expenseToDeleteId, setExpenseToDeleteId] = useState(null);

  // New state variables for summary
  const [last365DaysExpense, setLast365DaysExpense] = useState(0);
  const [last30DaysExpense, setLast30DaysExpense] = useState(0);
  const [last7DaysExpense, setLast7DaysExpense] = useState(0);

  // New state variables for day-wise and categorical expenses
  const [past30DaysSumExpenses, setPast30DaysSumExpenses] = useState([]);
  const [categoricalExpenses, setCategoricalExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Recalculate summary, day-wise, and categorical expenses whenever expenses change
  useEffect(() => {
    calculateExpenseSummaries(userExpenses);
    calculateDayWiseExpenses(userExpenses);
    calculateCategoricalExpenses(userExpenses);
  }, [userExpenses]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/expenses/expenses/"
      );
      setUserExpenses(response.data);
      console.log("Expenses fetched successfully.");
    } catch (error) {
      console.error("Error fetching expenses: ", error);
    }
  };

  // Function to calculate expense summaries (already exists, no change)
  const calculateExpenseSummaries = (currentExpenses) => {
    const now = new Date();

    const sumExpenses = (filteredExpenses) =>
      filteredExpenses
        .reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0)
        .toFixed(2);

    // Calculate last 365 days
    const last365DaysAgo = new Date(now);
    last365DaysAgo.setDate(now.getDate() - 365);
    const expensesLast365Days = currentExpenses.filter(
      (exp) => new Date(exp.created_at) >= last365DaysAgo
    );
    setLast365DaysExpense(sumExpenses(expensesLast365Days));

    // Calculate last 30 days
    const last30DaysAgo = new Date(now);
    last30DaysAgo.setDate(now.getDate() - 30);
    const expensesLast30Days = currentExpenses.filter(
      (exp) => new Date(exp.created_at) >= last30DaysAgo
    );
    setLast30DaysExpense(sumExpenses(expensesLast30Days));

    // Calculate last 7 days
    const last7DaysAgo = new Date(now);
    last7DaysAgo.setDate(now.getDate() - 7);
    const expensesLast7Days = currentExpenses.filter(
      (exp) => new Date(exp.created_at) >= last7DaysAgo
    );
    setLast7DaysExpense(sumExpenses(expensesLast7Days));
  };

  // Function to calculate day-wise expenses for the past 30 days
  const calculateDayWiseExpenses = (currentExpenses) => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const dayWiseMap = new Map();

    currentExpenses.forEach((expense) => {
      const expenseDate = new Date(expense.created_at);
      if (expenseDate >= thirtyDaysAgo && expenseDate <= now) {
        const dateKey = expenseDate.toDateString(); // "Mon Jul 01 2024"
        const existingAmount = dayWiseMap.get(dateKey) || 0;
        dayWiseMap.set(dateKey, existingAmount + parseFloat(expense.amount || 0));
      }
    });

    // Convert map to array of objects and sort by date descending
    const sortedDayWiseExpenses = Array.from(dayWiseMap.entries())
      .map(([dateString, amount]) => ({
        label: formatExpenseDate(dateString), // Use the helper to format
        amount: amount,
      }))
      .sort((a, b) => new Date(b.label) - new Date(a.label)); // Sort by date (latest first)

    setPast30DaysSumExpenses(sortedDayWiseExpenses);
  };

  // Function to calculate categorical expenses
  const calculateCategoricalExpenses = (currentExpenses) => {
    const categoryMap = new Map();

    currentExpenses.forEach((expense) => {
      const categoryKey = expense.category || "Uncategorized";
      const existingAmount = categoryMap.get(categoryKey) || 0;
      categoryMap.set(categoryKey, existingAmount + parseFloat(expense.amount || 0));
    });

    // Convert map to array of objects
    const sortedCategoricalExpenses = Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        label: category,
        amount: amount,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort by category name alphabetically

    setCategoricalExpenses(sortedCategoricalExpenses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/expenses/create/",
        { name, amount: parseFloat(amount), category },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Expense created Successfully: " + response.data.name);
      setName("");
      setAmount("");
      setCategory("");
      setUserExpenses((prev) => [...prev, response.data]);
      // The useEffect will handle recalculating summaries
    } catch (error) {
      console.error("Error creating expense: ", error);
    }
  };

  const handleEdit = (expenseId) => {
    const expense = userExpenses.find((exp) => exp.id === expenseId);
    if (expense) {
      setName(expense.name);
      setAmount(expense.amount);
      setCategory(expense.category);
      setEditingId(expense.id);
      setShowModal(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/expenses/update/${editingId}/`,
        { name, amount: parseFloat(amount), category },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Expense updated successfully: " + response.data.name);
      const updatedExpenses = userExpenses.map((exp) =>
        exp.id === editingId ? response.data : exp
      );
      setUserExpenses(updatedExpenses);
      setShowModal(false);
      setName("");
      setAmount("");
      setCategory("");
      // The useEffect will handle recalculating summaries
    } catch (error) {
      console.error("Error updating expense: ", error);
    }
  };

  const handleDeleteClick = (expenseId) => {
    setExpenseToDeleteId(expenseId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/expenses/delete/${expenseToDeleteId}/`
      );
      const updatedExpenses = userExpenses.filter(
        (expense) => expense.id !== expenseToDeleteId
      );
      setUserExpenses(updatedExpenses);
      console.log("Expense deleted successfully!");
      setShowConfirmModal(false);
      setExpenseToDeleteId(null);
      // The useEffect will handle recalculating summaries
    } catch (error) {
      console.error("Error deleting expense: ", error);
      setShowConfirmModal(false);
      setExpenseToDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setExpenseToDeleteId(null);
  };

  const totalExpense = userExpenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount || 0),
    0
  );

  return (
    <>
      <Header />

      {/* Add Expense */}
      <div className="flex flex-col justify-center px-4 mt-12">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 font-medium p-2">
            <span className="text-lg font-bold">Add Expense</span>
            <span className="text-purple-700 text-4xl font-medium leading-none">
              +
            </span>
          </div>
          <div className="shadow-lg px-2 py-6 sm:px-6 sm:py-12 mx-auto w-full sm:w-11/12 md:w-[90%] lg:w-[90%] xl:w-[90%] ">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 sm:gap-y-0 sm:gap-x-4">
              <div className="col-span-1">
                <div className="text-left font-semibold mb-1 sm:block hidden">
                  Expense Name
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Expense Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-1">
                <div className="text-left font-semibold mb-1 sm:block hidden">
                  Amount
                </div>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-1">
                <div className="text-left font-semibold mb-1 sm:block hidden">
                  Category
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-1 flex items-end">
                <button
                  type="submit"
                  className="font-bold bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded w-full sm:w-auto cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Show Expenses */}
      <div className="flex flex-col justify-center px-4 mt-12">
        <div className="flex items-center gap-2 font-medium p-2">
          <span className="text-lg font-bold">Expenses</span>
          <span className="text-purple-700 text-4xl font-medium leading-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-wallet w-8 h-8"
            >
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h12a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h12c.79 0 1.42-.36 1.77-1H20a2 2 0 0 0 2-2v-2h-2.83a2 2 0 0 1-1.77-1H20a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1Z" />
              <path d="M18 17v-1h.01" />
            </svg>
          </span>
        </div>
        <div className="shadow-lg px-2 py-6 sm:px-6 sm:py-12 mx-auto w-full max-w-[90%]">
          <div className="hidden sm:grid grid-cols-6 gap-2 sm:gap-10 p-2 mb-5 text-center font-semibold border-b-2 border-gray-200">
            <div>Expense Name</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Category</div>
            <div>Edit</div>
            <div>Delete</div>
          </div>

          {userExpenses.length === 0 ? (
            <div className="text-center text-gray-500">
              No expenses recorded yet.
            </div>
          ) : (
            userExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col sm:grid sm:grid-cols-6 gap-2 sm:gap-10 p-4 sm:p-2 text-center border-b sm:border-b-0 border-gray-100 mb-2 sm:mb-0 rounded-lg sm:rounded-none bg-white sm:bg-transparent shadow-sm sm:shadow-none"
              >
                <div className="font-bold text-lg sm:text-base sm:font-normal sm:col-span-1 text-left sm:text-center">
                  <span className="sm:hidden block text-gray-500 text-sm">
                    Expense Name:{" "}
                  </span>
                  {expense.name}
                </div>
                <div className="text-xl font-bold text-green-600 sm:text-base sm:font-normal sm:col-span-1 text-left sm:text-center">
                  <span className="sm:hidden block text-gray-500 text-sm">
                    Amount:{" "}
                  </span>
                  ₹{expense.amount}
                </div>
                <div className="sm:col-span-1 text-left sm:text-center">
                  <span className="sm:hidden block text-gray-500 text-sm">
                    Date:{" "}
                  </span>
                  {formatExpenseDate(expense.created_at)}
                </div>
                <div className="sm:col-span-1 text-left sm:text-center">
                  <span className="sm:hidden block text-gray-500 text-sm">
                    Category:{" "}
                  </span>
                  {expense.category}
                </div>
                <div className="flex justify-start sm:justify-center gap-4 sm:col-span-1 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEdit(expense.id)}
                    className="text-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-edit w-8 h-8"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
                <div className="flex justify-start sm:justify-center gap-4 sm:col-span-1 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleDeleteClick(expense.id)}
                    className="text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trash-2 w-8 h-8"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Total Expense */}
          <div className="flex flex-col sm:grid sm:grid-cols-6 gap-2 sm:gap-10 p-4 sm:p-2 mt-4 text-center border-t-2 border-gray-200">
            <div className="hidden sm:block sm:col-span-1"></div>
            <div className="text-green-500 font-bold text-lg sm:text-xl sm:col-span-1 text-left sm:text-center">
              <span className="sm:hidden block text-gray-500 text-sm">
                Total:{" "}
              </span>
              ₹{totalExpense.toFixed(2)}
            </div>
            <div className="hidden sm:block sm:col-span-1"></div>
            <div className="hidden sm:block sm:col-span-1"></div>
            <div className="hidden sm:block sm:col-span-1"></div>
            <div className="hidden sm:block sm:col-span-1"></div>
          </div>
        </div>
      </div>

      {/* Modal for Edit */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Edit Expense
            </h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block font-semibold text-gray-700 mb-2">
                  Expense Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-5 py-2 rounded-md transition duration-300 ease-in-out"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2 rounded-md transition duration-300 ease-in-out"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this expense?
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-5 py-2 rounded-md transition duration-300 ease-in-out"
                onClick={handleCancelDelete}
              >
                No, Cancel
              </button>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-md transition duration-300 ease-in-out"
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expense Summary Cards */}
      <div className="flex justify-center flex-wrap gap-6 mt-12 px-4">
        <ExpenseSummaryCard title="LAST 365 DAYS" amount={last365DaysExpense} />
        <ExpenseSummaryCard title="LAST 30 DAYS" amount={last30DaysExpense} />
        <ExpenseSummaryCard title="LAST 7 DAYS" amount={last7DaysExpense} />
      </div>

      {/* Day-wise and Categorical Expense Cards */}
      <div className="flex justify-center flex-wrap gap-6 mt-12 px-4 mb-12">
        <ExpenseListCard
          title="Past 30 days sum expenses"
          data={past30DaysSumExpenses}
        />
        <ExpenseListCard
          title="Categorical expenses"
          data={categoricalExpenses}
        />
      </div>
    </>
  );
}