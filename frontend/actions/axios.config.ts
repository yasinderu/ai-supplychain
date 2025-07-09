"use server"

import axios from "axios";

const apiBaseUrl = process.env.API_ENDPOINT

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrZW5ueTEyMyIsImV4cCI6MTc1MjA3MDUyNn0.lTDrbHmL8wwSf9WlErSgbXZ61FT4ow_R0VDgV7WDd1E"

export const instance = axios.create({
  baseURL: apiBaseUrl,
  headers: {"Authorization": `Bearer ${token}`}
})