import { DataTable } from '@/components/DataTable'
import React from 'react'
import {columns} from '@/components/inventory/columns'
import { getInventoryList } from '@/actions/inventory.action'

const getData = async (): Promise<Inventory[]> => {

  const inventoryData = await getInventoryList()

  return inventoryData
  // return [
  //   {
  //   "quantity": 100,
  //   "status": "in_stock",
  //   "id": "b6d65d90-1e01-45ca-a60b-eed5b0c5ad4e",
  //   "item": {
  //     "name": "Office Table",
  //     "description": "An Office Table",
  //     "sku": "OT-01",
  //     "category": null,
  //     "id": "94e5bd7e-5c2d-4349-b53d-c1f81f50d4b8",
  //   },
  //   "location": {
  //     "name": "Central Warehouse",
  //     "address": "101 Industrial Zone, Cityville, 12345",
  //     "id": "00258560-efbd-466f-a29b-2f38c46e3709",
  //   }
  // },
  // {
  //   "quantity": 20,
  //   "status": "in_stock",
  //   "id": "5b57bfa9-2920-4a2c-8499-344acbae0bb4",
  //   "item": {
  //     "name": "Table Clock",
  //     "description": "A table clock",
  //     "sku": "TC-01",
  //     "category": null,
  //     "id": "a0be0e2b-0919-4266-a799-7b041aff1853",
  //   },
  //   "location": {
  //     "name": "Retail Store A - Downtown",
  //     "address": "45 Main Street, Downtown, 67890",
  //     "id": "49fcce11-f01e-4701-853a-43f4746bf57d",
  //   }
  // },
  // {
  //   "quantity": 200,
  //   "status": "in_stock",
  //   "id": "ce6bfcd9-b6e1-4302-8324-26c19a252187",
  //   "item": {
  //     "name": "Widget",
  //     "description": "A widget",
  //     "sku": "WG-01",
  //     "category": null,
  //     "id": "bc6f379f-b660-401b-b1e7-1a33e727876c",
  //   },
  //   "location": {
  //     "name": "Showroom - East",
  //     "address": "123 Elm Street, Eastside, 11223",
  //     "id": "74e6a228-c0e8-4068-bf47-a19e54d00e43",
  //   }
  // },
  // ]
}

const Inventory = async () => {
  const data = await getData()
  return (
    <div className='py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Inventory