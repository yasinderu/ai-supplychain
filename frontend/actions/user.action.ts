"use server";

import { instance as axios } from "./axios.config";

interface User {
  username: string;
}

export const getUser = async (user: User) => {
  try {
    const response = await axios.post("/users", {
      username: user.username,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user.");
  }
};
