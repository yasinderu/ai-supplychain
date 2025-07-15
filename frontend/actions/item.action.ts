"use server";

import { instance as axios } from "./axios.config";

interface ItemCreate {
  name: string;
  description?: string;
  sku: string;
  category?: string;
}

export const getItemList = async () => {
  try {
    const response = await axios.get("/items");

    const data = response.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        sku: item.sku,
        category: item.category,
      };
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getItemDetail = async (itemId: string) => {
  try {
    const res = await axios.get(`/items/${itemId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createItem = async (item: ItemCreate) => {
  try {
    const response = await axios.post("/items", item);

    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (itemId: string) => {
  try {
    const res = await axios.delete(`/items/${itemId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
