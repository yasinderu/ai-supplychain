"use server";

import { signIn } from "@/auth";
import { instance as axios } from "./axios.config";
import { AuthError } from "next-auth";
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

    cookiesStore.set("session-token", response.data.access_token);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to authenticate user.");
  }
};

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};
