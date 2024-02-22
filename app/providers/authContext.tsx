"use client";

import axios from "axios";
import React, { createContext, useState } from "react";
import { IUserToken } from "./types/user-token";
import { BadRequestError } from "./errors/bad-request.error";
import { UnauthorizedError } from "./errors/unauthorized.error";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";

type AuthProps = {
  user: IUserToken | null;
  isLogged: boolean;
  login: (email: string, password: string) => Promise<IUserToken>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void
};

export const AuthContext = createContext<AuthProps>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserToken | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const login = async (
    email: string,
    password: string
  ): Promise<IUserToken> => {
    const result = await axios.post(
      BASE_URL + "/users/login",
      {
        email,
        password,
      },
      {
        validateStatus: function (status) {
          return status === 200 || status === 401 || status === 400;
        },
      }
    );

    if (result.status === 200) {
      const userToken: IUserToken = {
        id: result.data.id,
        name: result.data.name,
        email: result.data.email,
        token: result.data.token,
      };

      localStorage.setItem("user", JSON.stringify(userToken));
      setUser(userToken);
      setIsLogged(true);

      return userToken;
    } else if (result.status === 400) {
      throw new BadRequestError(result.data);
    } else if (result.status === 401) {
      throw new UnauthorizedError(result.data);
    } else throw new Error("Server Error, Try again!");
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    const result = await axios.post(
      BASE_URL + "/users",
      {
        email,
        password,
        name
      },
      {
        validateStatus: function (status) {
          return status === 200 || status === 201 || status === 401 || status === 400;
        },
      }
    );

    if (result.status === 400) {
      throw new BadRequestError(result.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLogged(false);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        isLogged,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
