"use server"

import { instance as axios } from "./axios.config"

export const getInventoryList = async () => {
  try {
   const response = await axios.get("/inventories")

   const inventoryData = response.data.map((inventory: any) => {
    return {
      id: inventory.id,
			item: {
				id: inventory.item.id,
				name: inventory.item.name,
				description: inventory.item.description,
				sku: inventory.item.sku
			},
			location: {
				name: inventory.location.name,
				address: inventory.location.address,
				id: inventory.location.id
			},
			quantity: inventory.quantity,
			status: inventory.status
    }
   })

	 return inventoryData
  } catch (error) {
    console.log(error)
  }

}