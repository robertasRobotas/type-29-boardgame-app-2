import axios from "axios";
import { NextRouter } from "next/router";
import { API_BASE_URL } from "@/constants/api";

export const validateJwtToken = async (token: string, router: NextRouter) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jwt/validate`, {
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (err) {
    console.log(err);
    router.push("/login");
  }
};

type LoginDataProps = {
  email: string;
  password: string;
};

export const login = async (data: LoginDataProps) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    ...data,
  });

  return response;
};
