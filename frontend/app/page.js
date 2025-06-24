"use client";
import { useState } from "react";
import React from "react";
import axios from "axios";
import Header from "@/components/Header";

export default function Home() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

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
          <div className="mt-6 ml-6">
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
    </>
  );
}
