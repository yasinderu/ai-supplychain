import React from "react";
import { getWarehouseList, deleteWarehouse } from "@/actions/warehouse.action";
import AddWarehouseModal from "@/components/warehouse/AddWarehouseModal";
import WarehouseList from "@/components/warehouse/WarehouseList";
import { WarehouseProvider } from "@/contexts/WarehouseContext";

const getdata = async (): Promise<Warehouse[]> => {
  const warehouseData = await getWarehouseList();

  return warehouseData;
};

const Warehouse = async () => {
  const data = await getdata();

  return (
    <WarehouseProvider>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-10 items-center">
          <h1 className="text-4xl">Warehouse List</h1>
          <AddWarehouseModal />
        </div>
        <WarehouseList
          deleteWarehouseAction={deleteWarehouse}
          warehouses={data}
        />
      </div>
    </WarehouseProvider>
  );
};

export default Warehouse;
