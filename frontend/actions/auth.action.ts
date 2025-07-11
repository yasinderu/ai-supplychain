"use server";

import { instance as axios } from "./axios.config";
import { stringify } from "querystring";
import { cookies } from "next/headers";

interface UserSignin {
  username: string;
  password: string;
}

export const userSignin = async (user: UserSignin) => {
  try {
    const cookiesStore = await cookies();
    const payload = {
      username: user.username,
      password: user.password,
    };
    const response = await axios.post("/token", stringify(payload));

    cookiesStore.set("session_token", response.data.access_token);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to authenticate user.");
  }
};
