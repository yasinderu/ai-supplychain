"use server";

import { instance as axios } from "./axios.config";

interface Message {
  text: string;
  user_id: string;
  sender: string;
}

export const askQuestion = async (question: AIQuestionType) => {
  try {
    const res = await axios.post("/ask", question);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAiChatHistory = async (userId: string | undefined) => {
  try {
    const res = await axios.get(`/chats/${userId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveMessageToAIChat = async (message: Message) => {
  try {
    const res = await axios.post("/chats", message);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
