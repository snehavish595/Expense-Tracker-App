export default function ExpenseForm({
  name,
  amount,
  category,
  setName,
  setAmount,
  setCategory,
  onSubmit,
  submitLabel = "Add",
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow-md p-6 space-y-4 w-full"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add Expense</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="e.g. Grocery"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 250"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. Food"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-purple-600 text-white px-6 py-2 mt-4 rounded-md hover:bg-purple-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}
