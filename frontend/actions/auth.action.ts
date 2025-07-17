"use server";

import { instance as axios } from "./axios.config";
import { stringify } from "querystring";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface UserSignin {
  username: string;
  password: string;
}

interface UserFromToken {
  user_id: string;
}

interface UserSignup extends UserSignin {
  fullname: string;
}

export const userSignin = async (user: UserSignin) => {
  try {
    const cookiesStore = await cookies();
    const payload = {
      username: user.username,
      password: user.password,
    };
    const response = await axios.post("/token", stringify(payload));
    const userDetail: UserFromToken = jwtDecode(response.data.access_token);

    cookiesStore.set("session_token", response.data.access_token);
    cookiesStore.set("user_id", userDetail.user_id);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to authenticate user.");
  }
};

export const userSignup = async (user: UserSignup) => {
  try {
    const res = await axios.post("/register", user);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
