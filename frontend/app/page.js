"use client"
import { useState } from "react";
import React from "react";
import axios from "axios";


export default function Home() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const newTask = {title, description};
        try{
            const response = await axios.post('http://127.0.0.1:8000/tasks/create/', newTask,
                { 
                    headers: {
                    'Content-Type': 'application/json',
                },
         } );
            alert('Task created Successfully' + response.data.title);
            setTitle('');
            setDescription('');
        } catch (error){
             console.error('Error creating task: ', error);
            alert('Error creating task: '+ error.message);
        }
    };

  return (
    <div className="flex justify-center items-center h-screen bg-amber-300">
        <form className="bg-white p-6 rounded shadow-lg" onSubmit={handleSubmit}>
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
    </div>
  );
}
