"use server"

import { instance as axios } from "./axios.config"

export const getItemList = async () => {
  try {
    const response = await axios.get("/items")
    
    const data = response.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        sku: item.sku,
        category: item.category
      }
    })

    return data
  } catch (error) {
    console.log(error)
  }
}