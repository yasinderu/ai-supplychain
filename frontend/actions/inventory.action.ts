"use server";

import { instance as axios } from "./axios.config";

interface InventoryCreate {
  itemId: string;
  locationId: string;
  quantity: number;
  status: string;
}

export const getInventoryList = async () => {
  try {
    const response = await axios.get("/inventories");

    const inventoryData = response.data.map((inventory: any) => {
      return {
        id: inventory.id,
        item: {
          id: inventory.item.id,
          name: inventory.item.name,
          description: inventory.item.description,
          sku: inventory.item.sku,
        },
        location: {
          name: inventory.location.name,
          address: inventory.location.address,
          id: inventory.location.id,
        },
        quantity: inventory.quantity,
        status: inventory.status,
      };
    });

    return inventoryData;
  } catch (error) {
    console.log(error);
  }
};

export const addInventory = async (payload: InventoryCreate) => {
  try {
    const response = await axios.post("/inventories", payload);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
