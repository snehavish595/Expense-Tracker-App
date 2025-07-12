import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/expenses";

export const fetchExpenses = () => axios.get(`${BASE_URL}/expenses/`);
export const createExpense = (data) => axios.post(`${BASE_URL}/create/`, data);
export const updateExpense = (id, data) =>
  axios.put(`${BASE_URL}/update/${id}/`, data);
export const deleteExpense = (id) => axios.delete(`${BASE_URL}/delete/${id}/`);
