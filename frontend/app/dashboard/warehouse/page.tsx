import { DataTable } from '@/components/DataTable'
import React from 'react'
import {columns} from '@/components/warehouse/columns'
import { getWarehouseList } from '@/actions/warehouse.action'

const getdata = async (): Promise<Warehouse[]> => {

  const warehouseData = await getWarehouseList()

  return warehouseData
}

const Warehouse = async () => {
  const data = await getdata()

  return (
    <div className='py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Warehouse