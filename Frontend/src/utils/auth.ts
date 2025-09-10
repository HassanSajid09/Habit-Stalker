import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  user: {
    id: string;
    name?: string;
    email?: string;
    role?: string;
  };
  iat: number;
  exp: number;
}
export const getToken = () => localStorage.getItem("token");

export const getDecodedUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return decoded.user;
  } catch (err: unknown) {
    console.log(err);
    return null;
  }
};

export const isAuthenticated = () => !!getDecodedUser();
