import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import getToken from "./getToken";

export interface TokenType {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
  email?: string;
}

export const getUserFromToken = (): TokenType | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenType>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      Cookies.remove("token");
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    Cookies.remove("token");
    return null;
  }
};
