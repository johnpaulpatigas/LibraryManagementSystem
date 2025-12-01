// lib/services/books.ts
import api from "./api";

export const getBooks = async () => {
  return await api.get("/books");
};

export const getAllBooks = async () => {
  return await api.get("/books/all");
};

export const getBook = async (id: number) => {
  return await api.get(`/books/${id}`);
};

export const createBook = async (data: any) => {
  return await api.post("/books", data);
};

export const updateBook = async (id: number, data: any) => {
  return await api.put(`/books/${id}`, data);
};

export const deleteBook = async (id: number) => {
  return await api.delete(`/books/${id}`);
};

export const associateAuthor = async (bookId: number, authorId: number) => {
  return await api.post(`/books/${bookId}/authors`, { authorId });
};

export const removeAuthor = async (bookId: number, authorId: number) => {
  return await api.delete(`/books/${bookId}/authors/${authorId}`);
};

export const associateCategory = async (bookId: number, categoryId: number) => {
  return await api.post(`/books/${bookId}/categories`, { categoryId });
};

export const removeCategory = async (bookId: number, categoryId: number) => {
  return await api.delete(`/books/${bookId}/categories/${categoryId}`);
};
