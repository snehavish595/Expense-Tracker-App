"use client";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Header from "@/components/Header";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expenses/expenses/")
      .then((response) => setExpenses(response.data))
      .catch((error) => {
        console.error("Error fetching expenses: ", error);
        alert("Error fetching expenses: " + error.message);
      });
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/expenses/create/",
        { name, amount, category },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Expense created Successfully: " + response.data.name);
      setName("");
      setAmount("");
      setCategory("");
      setExpenses((prev) => [...prev, response.data]); // update list without reload
    } catch (error) {
      console.error("Error creating expense: ", error);
      alert("Error creating expense: " + error.message);
    }
  };

  // Placeholder function for editing an expense
  const handleEdit = (expenseId) => {
    alert(`Edit expense with ID: ${expenseId}`);
    // In a real application, you would typically open a modal or navigate to an edit page
  };

  const handleDelete = async (expenseId) => {
    if (window.confirm(`Are you sure you want to delete expense with ID: ${expenseId}?`)) {
      try {
        await axios.delete(`http://127.0.0.1:8000/expenses/delete/${expenseId}/`);
        setExpenses(expenses.filter(expense => expense.id !== expenseId));
        alert("Expense deleted successfully!");
      } catch (error) {
        console.error("Error deleting expense: ", error);
        alert("Error deleting expense: " + error.message);
      }
    }
  };

  const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);

  return (
    <>
      <Header />

     {/* Add Expense */}
      <div className="flex flex-col justify-center px-4 mt-12">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 font-medium p-2">
            <span className="text-lg font-bold">Add Expense</span>
            <span className="text-purple-700 text-4xl font-medium leading-none">+</span>
          </div>
          {/* Container width for 80% on larger screens and centering */}
          <div className="shadow-lg px-2 py-6 sm:px-6 sm:py-12 mx-auto w-full sm:w-11/12 md:w-[90%] lg:w-[90%] xl:w-[90%] ">
            {/* Grid for labels and inputs/button */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 sm:gap-y-0 sm:gap-x-4"> {/* Adjusted gap-x */}
              {/* Expense Name */}
              <div className="col-span-1">
                <div className="text-left font-semibold mb-1 sm:block hidden">Expense Name</div> {/* Label hidden on mobile */}
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Expense Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Amount */}
              <div className="col-span-1">
                <div className="text-left font-semibold mb-1 sm:block hidden">Amount</div> {/* Label hidden on mobile */}
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="col-span-1">
                <div className="text-left font-semibold mb-1 sm:block hidden">Category</div> {/* Label hidden on mobile */}
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              {/* Add Button */}
              <div className="col-span-1 flex items-end"> {/* Use flex items-end to align button to the bottom of its grid cell */}
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
            <img src="/images/expenses.png" alt="Expenses" className="w-8 h-8" />
          </span>
        </div>
        <div className="shadow-lg px-2 py-6 sm:px-6 sm:py-12 mx-auto w-full max-w-[90%]"> {/* Adjusted padding and added max-width */}
          {/* Table Header - hidden on mobile, visible on sm and up */}
          <div className="hidden sm:grid grid-cols-6 gap-2 sm:gap-10 p-2 mb-5 text-center font-semibold border-b-2 border-gray-200">
            <div>Expense Name</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Category</div>
            <div>Edit</div> {/* Changed col-span to 1 */}
            <div>Delete</div>{/* Changed col-span to 1 */}
          </div>

          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex flex-col sm:grid sm:grid-cols-6 gap-2 sm:gap-10 p-4 sm:p-2 text-center border-b sm:border-b-0 border-gray-100 mb-2 sm:mb-0 rounded-lg sm:rounded-none bg-white sm:bg-transparent shadow-sm sm:shadow-none" // Flex for mobile (card), grid for sm and up
            >
              {/* Expense Name */}
              <div className="font-bold text-lg sm:text-base sm:font-normal sm:col-span-1 text-left sm:text-center">
                <span className="sm:hidden block text-gray-500 text-sm">Expense Name: </span>{expense.name}
              </div>
              {/* Amount */}
              <div className="text-xl font-bold text-green-600 sm:text-base sm:font-normal sm:col-span-1 text-left sm:text-center">
                <span className="sm:hidden block text-gray-500 text-sm">Amount: </span>₹{expense.amount}
              </div>
              {/* Date */}
              <div className="sm:col-span-1 text-left sm:text-center">
                <span className="sm:hidden block text-gray-500 text-sm">Date: </span>
                {new Date(expense.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              {/* Category */}
              <div className="sm:col-span-1 text-left sm:text-center">
                <span className="sm:hidden block text-gray-500 text-sm">Category: </span>{expense.category}
              </div>
              {/* Edit Button */}
              <div className="flex justify-start sm:justify-center gap-4 sm:col-span-1 mt-2 sm:mt-0"> {/* Changed col-span to 1 */}
                <button onClick={() => handleEdit(expense.id)} className="text-blue-500">
                  <img src="/images/edit.png" className="w-8 cursor-pointer" alt="Edit" />
                </button>
              </div>
              {/* Delete Button */}
              <div className="flex justify-start sm:justify-center gap-4 sm:col-span-1 mt-2 sm:mt-0"> {/* Changed col-span to 1 */}
                <button onClick={() => handleDelete(expense.id)} className="text-red-500">
                  <img src="/images/delete.png" className="w-8 cursor-pointer" alt="Delete" />
                </button>
              </div>
            </div>
          ))}

          {/* Total Expense */}
          <div className="flex flex-col sm:grid sm:grid-cols-6 gap-2 sm:gap-10 p-4 sm:p-2 mt-4 text-center border-t-2 border-gray-200">
            <div className="hidden sm:block sm:col-span-1"></div> {/* Empty div for alignment on larger screens */}
            <div className="text-green-500 font-bold text-lg sm:text-xl sm:col-span-1 text-left sm:text-center">
                <span className="sm:hidden block text-gray-500 text-sm">Total: </span>₹{totalExpense.toFixed(2)}
            </div>
            {/* Empty divs to maintain grid structure on sm and up */}
            <div className="hidden sm:block sm:col-span-1"></div>
            <div className="hidden sm:block sm:col-span-1"></div>
            <div className="hidden sm:block sm:col-span-1"></div>
            <div className="hidden sm:block sm:col-span-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}