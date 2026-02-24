import { API_BASE_URL } from "@/constants/api";
import axios from "axios";

export const getAllBoardgames = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/boardgames`, {
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getBoardgameById = async (token: string, id: string) => {
  const response = await axios.get(`${API_BASE_URL}/boardgames/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response;
};

export const toggleBoardgame = async (token: string, id: string) => {
  const result = await axios.post(
    `${API_BASE_URL}/user/save/boardgame`,
    { boardgameId: id },
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return result;
};
