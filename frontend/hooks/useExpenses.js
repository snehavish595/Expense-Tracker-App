// hooks/useExpenses.js
import { useState, useEffect } from "react";
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "@/services/expensesService";
import {
  calculateSummaries,
  calculateDayWiseExpenses,
  calculateCategoricalExpenses,
} from "@/utils/expenseCalculations";

export const useExpenses = () => {
  const [userExpenses, setUserExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [expenseToDeleteId, setExpenseToDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [last365DaysExpense, setLast365DaysExpense] = useState(0);
  const [last30DaysExpense, setLast30DaysExpense] = useState(0);
  const [last7DaysExpense, setLast7DaysExpense] = useState(0);
  const [past30DaysSumExpenses, setPast30DaysSumExpenses] = useState([]);
  const [categoricalExpenses, setCategoricalExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const { data } = await fetchExpenses();
        console.log("Fetched expenses:", data); // 👈 ADD THIS
        setUserExpenses(data);
      } catch (err) {
        console.error("Failed to load expenses", err);
      }
    };
    loadExpenses();
  }, []);

  useEffect(() => {
    const { last365, last30, last7 } = calculateSummaries(userExpenses);
    setLast365DaysExpense(last365);
    setLast30DaysExpense(last30);
    setLast7DaysExpense(last7);

    const dayWise = calculateDayWiseExpenses(userExpenses);
    setPast30DaysSumExpenses(dayWise);

    const categorical = calculateCategoricalExpenses(userExpenses);
    setCategoricalExpenses(categorical);
  }, [userExpenses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: newExpense } = await createExpense({
        name,
        amount: parseFloat(amount),
        category,
      });
      setUserExpenses((prev) => [...prev, newExpense]);
      setName("");
      setAmount("");
      setCategory("");
    } catch (err) {
      console.error("Error creating expense", err);
    }
  };

  const handleEdit = (id) => {
    const expense = userExpenses.find((e) => e.id === id);
    if (expense) {
      setName(expense.name);
      setAmount(expense.amount);
      setCategory(expense.category);
      setEditingId(id);
      setShowModal(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data: updated } = await updateExpense(editingId, {
        name,
        amount: parseFloat(amount),
        category,
      });
      setUserExpenses((prev) =>
        prev.map((e) => (e.id === editingId ? updated : e))
      );

      setShowModal(false);
      setName("");
      setAmount("");
      setCategory("");
    } catch (err) {
      console.error("Error updating expense", err);
    }
  };

  const handleDeleteClick = (id) => {
    setExpenseToDeleteId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteExpense(expenseToDeleteId);
      setUserExpenses((prev) => prev.filter((e) => e.id !== expenseToDeleteId));
    } catch (err) {
      console.error("Error deleting expense", err);
    } finally {
      setShowConfirmModal(false);
      setExpenseToDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setExpenseToDeleteId(null);
  };

  const totalExpense = userExpenses.reduce(
    (acc, e) => acc + parseFloat(e.amount || 0),
    0
  );

  return {
    userExpenses,
    name,
    amount,
    category,
    editingId,
    showModal,
    showConfirmModal,
    expenseToDeleteId,
    searchQuery,
    setName,
    setAmount,
    setCategory,
    setSearchQuery,
    setShowModal,
    handleSubmit,
    handleEdit,
    handleUpdate,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    last365DaysExpense,
    last30DaysExpense,
    last7DaysExpense,
    past30DaysSumExpenses,
    categoricalExpenses,
    totalExpense,
  };
};
