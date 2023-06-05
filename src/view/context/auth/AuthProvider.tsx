import React, { FC, ReactElement, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { IUser } from "src/core/product/entity";
import GetUserAuthenticate from "src/core/product/actions/getUserAuthenticate";
import { RepositoryUsersInMongo } from "src/infra/database/auth/repository/RepositoryUsersInMongo";
import Cookies from "js-cookie";
import RegisterUser from "src/core/product/actions/registerUser";
import ValidateToken from "src/core/product/actions/validateToken";
import { useRouter } from "next/router";
import { deleteAddressInCookies } from "utils";
import { useSession, signOut } from "next-auth/react";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: ReactElement;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      const user: IUser = data?.user as any;
      dispatch({ type: "Auth - Login", payload: user });
    }
  }, [status, data]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const validateToken = new ValidateToken(new RepositoryUsersInMongo());

  const logout = () => {
    deleteAddressInCookies();
    signOut();
  };

  const checkToken = async () => {
    const tokenCookie = Cookies.get("token");
    if (!tokenCookie) {
      return;
    }
    const result = await validateToken.execute(tokenCookie);
    if (result.error) {
      dispatch({ type: "Auth - Logout" });
      return;
    }
    const { user, token } = result;
    dispatch({ type: "Auth - Login", payload: user });
    Cookies.set("token", token);
  };

  const getUserAuthenticate = new GetUserAuthenticate(
    new RepositoryUsersInMongo()
  );

  const registerUser = new RegisterUser(new RepositoryUsersInMongo());

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const result = await getUserAuthenticate.execute(email, password);
      if (result.error) return false;
      const { user, token } = result;
      dispatch({ type: "Auth - Login", payload: user });
      Cookies.set("token", token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const onRegisterUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const result = await registerUser.execute(name, email, password);
      if (result.error) return false;
      const { user, token } = result;
      dispatch({ type: "Auth - Login", payload: user });
      Cookies.set("token", token);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, loginUser, onRegisterUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
