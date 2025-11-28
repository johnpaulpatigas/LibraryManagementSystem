// lib/services/users.ts
import api from "./api";

export const getUsers = async () => {
  return await api.get("/users");
};

export const getUser = async (id: number) => {
  return await api.get(`/users/${id}`);
};

export const updateUser = async (id: number, data: any) => {
  return await api.put(`/users/${id}`, data);
};

export const deleteUser = async (id: number) => {
  return await api.delete(`/users/${id}`);
};

export const createUser = async (data: any) => {
    return await api.post("/auth/register", data);
}

export const updateUserProfile = async (data: any) => {
  return await api.put("/users/profile", data);
};

export const changePassword = async (data: any) => {
  return await api.put("/users/profile/password", data);
};
