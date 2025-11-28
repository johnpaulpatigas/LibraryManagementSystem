// lib/services/book_requests.ts
import api from "./api";

export const getBookRequests = async () => {
  return await api.get("/book-requests");
};

export const getBookRequest = async (id: number) => {
  return await api.get(`/book-requests/${id}`);
};

export const createBookRequest = async (data: any) => {
  return await api.post("/book-requests", data);
};

export const updateBookRequest = async (id: number, data: any) => {
  return await api.put(`/book-requests/${id}`, data);
};

export const deleteBookRequest = async (id: number) => {
  return await api.delete(`/book-requests/${id}`);
};
