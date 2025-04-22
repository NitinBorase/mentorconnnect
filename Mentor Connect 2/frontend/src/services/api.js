import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

export const signup = async (data) => {
  const response = await API.post("/auth/signup", data);
  return response.data;
};

export const login = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};