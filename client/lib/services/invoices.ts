// lib/services/invoices.ts
import api from "./api";

export const getInvoices = async () => {
  return await api.get("/invoices");
};

export const getInvoice = async (id: number) => {
  return await api.get(`/invoices/${id}`);
};

export const createInvoice = async (data: any) => {
  return await api.post("/invoices", data);
};

export const updateInvoice = async (id: number, data: any) => {
  return await api.put(`/invoices/${id}`, data);
};

export const deleteInvoice = async (id: number) => {
  return await api.delete(`/invoices/${id}`);
};
