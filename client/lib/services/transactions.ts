// lib/services/transactions.ts
import api from "./api";

export const getTransactions = async () => {
  return await api.get("/transactions");
};

export const getTransaction = async (id: number) => {
  return await api.get(`/transactions/${id}`);
};

export const createTransaction = async (data: any) => {
  return await api.post("/transactions", data);
};

export const updateTransaction = async (id: number, data: any) => {
  return await api.put(`/transactions/${id}`, data);
};

export const deleteTransaction = async (id: number) => {
  return await api.delete(`/transactions/${id}`);
};
