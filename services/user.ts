"use client";
import { FormEvent } from "react";
import { API_BASE_URL } from "../constants/constants";
import axios from "axios";

export const useAuth = () => {
  const handleSignup = async (
    values: {
      username: string;
      email: string;
      password: string;
      role: string;
      departmentId: string;
    },
    event: FormEvent<HTMLFormElement> | undefined
  ) => {
    event?.preventDefault();
    const user = await axios.post(`${API_BASE_URL}/user/signup`, values);

    console.log("user", user);
  };
  const handleLogin = async (
    values: {
      EmailOrUsername: string;
      password: string;
    },
    event: FormEvent<HTMLFormElement> | undefined
  ) => {
    event?.preventDefault();
    const user = await axios.post(`${API_BASE_URL}/user/signin`, values);

    console.log("user", user);
  };

  return { handleSignup, handleLogin };
};
