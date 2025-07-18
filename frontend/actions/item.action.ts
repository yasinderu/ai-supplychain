"use server";

import { instance as axios } from "./axios.config";

interface ItemPayload {
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

export const createItem = async (item: ItemPayload) => {
  try {
    const response = await axios.post("/items", item);

    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = async (item: ItemPayload, itemId: string) => {
  try {
    const res = await axios.patch(`/items/${itemId}`, item);

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
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
