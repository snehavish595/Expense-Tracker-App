export const formatExpenseDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export const calculateSummaries = (expenses) => {
  const now = new Date();
  const sumExpenses = (filtered) =>
    filtered.reduce((acc, exp) => acc + parseFloat(exp.amount || 0), 0).toFixed(2);

const filterByDays = (days) => {
  const pastDate = new Date(now);
  pastDate.setDate(now.getDate() - days);
  return expenses.filter((e) => {
    const created = new Date(e.created_at);
    return !isNaN(created) && created >= pastDate;
  });
};


  return {
    last365: sumExpenses(filterByDays(365)),
    last30: sumExpenses(filterByDays(30)),
    last7: sumExpenses(filterByDays(7)),
  };
};

export const calculateDayWiseExpenses = (expenses) => {
  const now = new Date();
  const past = new Date(now);
  past.setDate(now.getDate() - 30);

  const dayWiseMap = new Map();

  expenses.forEach((expense) => {
    const date = new Date(expense.created_at);
    if (date >= past && date <= now) {
      const key = date.toDateString();
      dayWiseMap.set(key, (dayWiseMap.get(key) || 0) + parseFloat(expense.amount || 0));
    }
  });

  return Array.from(dayWiseMap.entries())
    .map(([date, amount]) => ({
      label: formatExpenseDate(date),
      amount,
    }))
    .sort((a, b) => new Date(a.label) - new Date(b.label));
};

export const calculateCategoricalExpenses = (expenses) => {
  const categoryMap = new Map();

  expenses.forEach((expense) => {
    const cat = expense.category || "Uncategorized";
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + parseFloat(expense.amount || 0));
  });

  return Array.from(categoryMap.entries())
    .map(([label, amount]) => ({ label, amount }))
    .sort((a, b) => a.label.localeCompare(b.label));
};
