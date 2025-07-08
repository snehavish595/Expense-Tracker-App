// app/page.js
"use client";
import Header from "@/components/Header";
import ExpenseListCard from "@/components/ExpenseListCard";
import ExpenseForm from "@/components/ExpenseForm";
import PieChart from "@/components/PieChart";
import LineChart from "@/components/LineChart";
import EditExpenseModal from "@/components/EditExpenseModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useExpenses } from "@/hooks/useExpenses";

export default function Home() {
  const {
    name, amount, category,
    setName, setAmount, setCategory,
    userExpenses, handleSubmit, handleEdit,
    editingId, showModal, setShowModal,
    handleUpdate, showConfirmModal,
    handleDeleteClick, handleConfirmDelete, handleCancelDelete,
    last365DaysExpense, last30DaysExpense, last7DaysExpense,
    past30DaysSumExpenses, categoricalExpenses, totalExpense,
  } = useExpenses();

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="container mx-auto py-6 px-4">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card title="Last 365 Days" value={last365DaysExpense} />
          <Card title="Last 30 Days" value={last30DaysExpense} />
          <Card title="Last 7 Days" value={last7DaysExpense} />
          <Card title="Total" value={totalExpense} />
        </div>

        {/* Charts */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <LineChart data={past30DaysSumExpenses} />
          <PieChart data={categoricalExpenses} />
        </div>

        {/* Add Expense */}
        <div className="mb-6 max-w-6xl mx-auto px-4 py-8 space-y-8">
          <h2 className="text-xl font-bold mb-2">Add New Expense</h2>
          <ExpenseForm
            name={name}
            amount={amount}
            category={category}
            setName={setName}
            setAmount={setAmount}
            setCategory={setCategory}
            onSubmit={handleSubmit}
            submitLabel="Add"
          />
        </div>

        {/* Expenses List */}
        <div className="grid md:grid-cols-2 gap-4">
          <ExpenseListCard
            title="All Expenses"
            data={userExpenses.map(exp => ({
              label: exp.name,
              amount: parseFloat(exp.amount),
              id: exp.id,
            }))}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </section>

      {showModal && (
        <EditExpenseModal
          name={name}
          amount={amount}
          category={category}
          setName={setName}
          setAmount={setAmount}
          setCategory={setCategory}
          onSubmit={handleUpdate}
          onClose={() => setShowModal(false)}
        />
      )}

      {showConfirmModal && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </main>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <p className="text-sm text-gray-500 font-medium uppercase">{title}</p>
      <p className="text-2xl font-bold text-green-600">₹{parseFloat(value).toFixed(2)}</p>
    </div>
  );
}
