import LoginResponse from "../models/response/LoginResponse";
import SignupResponse from "../models/response/SignupResponse";
import { api } from "./TodoClient";

export const login = async (request) => {
  try {
    const response = await api.post("/auth/login", request);
    localStorage.setItem("token", JSON.stringify(response.data));
    response.data.success = true;
    return new LoginResponse(response);
  } catch (error) {
    console.error("Kullanıcı adı veya şifre yanlış. Lütfen tekrar deneyin.");
    error.response.data.success = false;
    return new LoginResponse(error.response);
  }
};

export const signup = async (request) => {
  try {
    const response = await api.post("auth/signup", request);
    response.data.success = true;
    return new SignupResponse(response);
  } catch (err) {
    err.response.data.success = false;
    return new SignupResponse(err.response);
  }
};
