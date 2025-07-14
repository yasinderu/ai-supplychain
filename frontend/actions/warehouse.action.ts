"use server";

import { instance as axios } from "./axios.config";

interface WarehouseCreate {
  name: string;
  address: string;
}

export const getWarehouseList = async () => {
  try {
    const response = await axios.get("/locations");

    const warehouseData = response.data.map((warehouse: any) => {
      return {
        id: warehouse.id,
        name: warehouse.name,
        address: warehouse.address,
      };
    });

    return warehouseData;
  } catch (error) {
    console.log(error);
  }
};

export const getWarehouseDetail = async (warehouseId: string) => {
  try {
    const res = await axios.get(`/locations/${warehouseId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addWarehouse = async (payload: WarehouseCreate) => {
  try {
    const response = await axios.post("/locations", payload);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
