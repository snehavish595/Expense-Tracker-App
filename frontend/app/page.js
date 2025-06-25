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
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses: ", error);
        alert("Error fetching expenses: " + error.message);
      });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = { name, amount, category };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/expenses/create/",
        newTask,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Expense created Successfully" + response.data.name);
      setName("");
      setAmount("");
      setCategory("");
    } catch (error) {
      console.error("Error creating task: ", error);
      alert("Error creating task: " + error.message);
    }
  };

    // Calculate total expense
  const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);

  return (
    <>
      <Header />

      {/* // Add expense */}
      <div className="flex flex-col justify-center px-4 mt-12">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 font-medium p-2">
            <span className="text-lg font-bold">Add Expense</span>
            <span className="text-purple-700 text-4xl font-medium leading-none">
              +
            </span>
          </div>
          <div className=" shadow-lg px-6 w-8xl py-12 mx-6">
            <div>
              <div className="grid grid-cols-8 gap-10 p-2  rounded-lg text-center">
                <div>Expense Name</div>
                <div>Amount</div>
                <div>Category</div>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-6 p-2 rounded-lg text-center">
                <input
                  type="text"
                  className="w-40 px-4 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input
                  type="text"
                  className="w-40 px-4 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-40 px-4 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
                <button
                  className="font-bold bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded cursor-pointer ml-12"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Show expenses */}
      <div className="flex flex-col justify-center px-4 mt-12">
        <div className="flex items-center gap-2 font-medium p-2">
          <span className="text-lg font-bold">Expenses</span>
          <span className="text-purple-700 text-4xl font-medium leading-none">
            <img
              src="/images/expenses.png"
              alt="Expenses"
              className="w-8 h-8"
            />
          </span>
        </div>
        <div className=" shadow-lg px-6 w-8xl py-12 mx-6">
          <div>
            <div className="grid grid-cols-6 gap-10 p-2 mb-5   text-center border-b-3 border-gray-200">
              <div>Expense Name</div>
              <div>Amount</div>
              <div>Date</div>
              <div>Category</div>
              <div>Edit</div>
              <div>Delete</div>
            </div>

            <div>
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="grid grid-cols-6 gap-10 p-2 text-center"
                >
                  <div>{expense.name}</div>
                  <div>₹{expense.amount}</div>
                  <div>
                    {new Date(expense.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div>{expense.category}</div>
                  <div>
                    {/* Add edit functionality here */}
                    <button className="text-blue-500">
                      <img
                        src="images/edit.png"
                        className="w-8 cursor-pointer"
                      />
                    </button>
                  </div>
                  <div>
                    {/* Add delete functionality here */}
                    <button className="text-red-500">
                      <img
                        src="images/delete.png"
                        className="w-8 cursor-pointer"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-6 gap-10 p-2 mb-5   text-center border-t-2  border-gray-200">
              <div></div>
              <div className="text-green-500 font-semibold">Total: ₹{totalExpense.toFixed(2)}</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-6 p-2 rounded-lg text-center"></div>
          </div>
        </div>
      </div>
    </>
  );
}
