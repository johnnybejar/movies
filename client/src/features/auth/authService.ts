import axios from "axios";

interface User {
  email: string;
  password: string;
}

const API_URL = "api/users";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
});

const register = async (userData: User) => {
  const response = await axiosClient.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData: User) => {
  const response = await axiosClient.post(API_URL + "/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
