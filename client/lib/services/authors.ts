// lib/services/authors.ts
import api from "./api";

export const getAuthors = async () => {
  return await api.get("/authors");
};

export const getAuthor = async (id: number) => {
  return await api.get(`/authors/${id}`);
};

export const createAuthor = async (data: any) => {
  return await api.post("/authors", data);
};

export const updateAuthor = async (id: number, data: any) => {
  return await api.put(`/authors/${id}`, data);
};

export const deleteAuthor = async (id: number) => {
  return await api.delete(`/authors/${id}`);
};
