// lib/services/issued_books.ts
import api from "./api";

export const getIssuedBooks = async () => {
  return await api.get("/issued-books");
};

export const getIssuedBook = async (id: number) => {
  return await api.get(`/issued-books/${id}`);
};

export const issueBook = async (data: any) => {
  return await api.post("/issued-books", data);
};

export const updateIssuedBook = async (id: number, data: any) => {
  return await api.put(`/issued-books/${id}`, data);
};
