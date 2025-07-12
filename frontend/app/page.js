// app/page.js
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

      <section className="container mx-auto py-10 px-4 w-[90%]">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <OverviewCard title="Last 365 Days" value={last365DaysExpense} />
          <OverviewCard title="Last 30 Days" value={last30DaysExpense} />
          <OverviewCard title="Last 7 Days" value={last7DaysExpense} />
          <OverviewCard title="Total" value={totalExpense} />
        </div>

        {/* Charts */}
        <div className="flex flex-wrap justify-center w-full gap-2">
          <LineChart data={past30DaysSumExpenses} />
          <PieChart data={categoricalExpenses} />
        </div>

        {/* Add Expense */}
        <div className="mt-16 mb-12 w-full mx-auto">
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Expense</h2> */}
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
        <ExpenseListCard
          title="All Expenses"
          data={userExpenses.map(exp => ({
            label: exp.name,
            name: exp.name,
            amount: parseFloat(exp.amount),
            category: exp.category,
            id: exp.id,
            created_at: exp.created_at
          }))}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
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

      <Footer />
    </main>
  );
}

function OverviewCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow text-center border border-gray-200">
      <p className="text-sm text-gray-500 font-medium uppercase">{title}</p>
      <p className="text-2xl font-bold text-indigo-600">₹{parseFloat(value).toFixed(2)}</p>
    </div>
  );
}
