"use server";

import axios from "axios";
import { cookies } from "next/headers";

const apiBaseUrl = process.env.API_ENDPOINT;

export const getTokenFromCookies = async (cookieName: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value;
};

export const instance = axios.create({
  baseURL: apiBaseUrl,
});

instance.interceptors.request.use(async (config) => {
  const token = await getTokenFromCookies("session_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
