"use server";

import axios from "axios";
import { cookies } from "next/headers";

const apiBaseUrl = process.env.API_ENDPOINT;

const cookiesStore = await cookies();

const token = cookiesStore.get("session-token")?.value;

console.log(token);

export const instance = axios.create({
  baseURL: apiBaseUrl,
  headers: { Authorization: `Bearer ${token}` },
});
