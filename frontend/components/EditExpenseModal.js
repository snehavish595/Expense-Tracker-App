export default function EditExpenseModal({ name, amount, category, setName, setAmount, setCategory, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Expense</h2>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Expense Name" className="input mb-4" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="number" placeholder="Amount" className="input mb-4" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          <input type="text" placeholder="Category" className="input mb-4" value={category} onChange={(e) => setCategory(e.target.value)} required />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="btn-gray">Cancel</button>
            <button type="submit" className="btn-green">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
