"use client";
import { useState } from "react";
import React from "react";
import axios from "axios";
import Header from "@/components/Header";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = { title, description };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/tasks/create/",
        newTask,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Task created Successfully" + response.data.title);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating task: ", error);
      alert("Error creating task: " + error.message);
    }
  };

  return (
    <>
      <Header />
      {/* <div className="flex justify-center items-center h-screen border-t-1 border-gray-100">
        <form className="bg-white p-6 rounded shadow-lg w-96" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input type="text" className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Task</button>
        </form>
    </div> */}

      {/* // Add expense */}
      <div className="flex flex-col justify-center px-12 mt-12">
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
              />

              <input
                type="text"
                className="w-40 px-4 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <input
                type="text"
                className="w-40 px-4 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
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
      </div>
    </>
  );
}
