"use server"

import { instance as axios } from "./axios.config"

export const getWarehouseList = async () => {
  try {
    const response = await axios.get("/locations")

    const warehouseData = response.data.map((warehouse: any) => {
      return {
        id: warehouse.id,
        name: warehouse.name,
        address: warehouse.address
      }
    })
    
    return warehouseData
  } catch (error) {
    console.log(error)
  }
}