import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token ? token.jwt : "";
};

export const removeToken = () => {
    localStorage.removeItem("token")
  };

export const isTokenExpired = () => {
  console.log("expire check")
  const token = getToken();
  if (!token) return true; 
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    console.log(decoded.exp < currentTime)
    console.log("not expire, continue todo app")
    return decoded.exp < currentTime; 
  } catch (error) {
    console.log("expire")
    removeToken();
    return true; 
  }
};
