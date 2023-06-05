import { createContext } from "react";
import { IUser } from "src/core/product/entity";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  loginUser(email: string, password: string): Promise<boolean>;
  onRegisterUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
