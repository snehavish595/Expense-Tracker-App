import React from "react";

const ExpenseListCard = ({ title, data }) => {
  // Calculate the total amount from the data prop
  const totalAmount = data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start min-w-[430px] max-w-[44%] flex-grow transition-transform transform hover:scale-105 duration-300 ease-in-out border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 uppercase tracking-wide">
        {title}
      </h3>
      {data && data.length > 0 ? (
        <div className="w-full">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-800 text-lg">{item.label}</span>
              <span className="text-green-600 font-bold text-lg">₹{item.amount.toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t-2 border-gray-200 pt-4 mt-4"> 
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-green-700">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No data available.</p>
      )}
    </div>
  );
};

export default ExpenseListCard;