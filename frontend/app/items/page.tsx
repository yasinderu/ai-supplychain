import { getItemList } from '@/actions/item.action'
import { DataTable } from '@/components/DataTable'
import {columns} from '@/components/items/columns'
import React from 'react'

const getData = async (): Promise<Item[]> => {

  const itemData = await getItemList()

  return itemData
}

const ItemManagement = async () => {

  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default ItemManagement