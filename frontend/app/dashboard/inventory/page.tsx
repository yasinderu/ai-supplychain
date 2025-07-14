import { DataTable } from "@/components/DataTable";
import React from "react";
import { columns } from "@/components/inventory/columns";
import { getInventoryList } from "@/actions/inventory.action";
import AddInventoryModal from "@/components/inventory/AddInventoryModal";
import { getItemList } from "@/actions/item.action";
import { getWarehouseList } from "@/actions/warehouse.action";

const getData = async (): Promise<Inventory[]> => {
  const inventoryData = await getInventoryList();

  return inventoryData;
};

const Inventory = async () => {
  const data = await getData();
  const item = await getItemList();
  const warehouse = await getWarehouseList();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-10 items-center">
        <h1 className="text-4xl">Inventory List</h1>
        <AddInventoryModal items={item} warehouses={warehouse} />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Inventory;
