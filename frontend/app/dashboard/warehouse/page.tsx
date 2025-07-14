import { DataTable } from "@/components/DataTable";
import React from "react";
import { columns } from "@/components/warehouse/columns";
import { getWarehouseList } from "@/actions/warehouse.action";
import AddWarehouseModal from "@/components/warehouse/AddWarehouseModal";

const getdata = async (): Promise<Warehouse[]> => {
  const warehouseData = await getWarehouseList();

  return warehouseData;
};

const Warehouse = async () => {
  const data = await getdata();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-10 items-center">
        <h1 className="text-4xl">Warehouse List</h1>
        <AddWarehouseModal />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Warehouse;
