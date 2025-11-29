// lib/services/auth.ts
import api from "./api";

export const login = async (studentId: string, password: string) => {
  const response = await api.post("/auth/login", {
    studentid: studentId,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const register = async (data: any) => {
  return await api.post("/auth/register", data);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const forgotPassword = async (email: string) => {
  return await api.post("/auth/forgot-password", { email });
};

export const resetPassword = async (token: string, password: string) => {
  return await api.post("/auth/reset-password", { token, password });
};

export const getProfile = async () => {
  return await api.get("/users/profile");
};
