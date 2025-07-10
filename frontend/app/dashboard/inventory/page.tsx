import { DataTable } from "@/components/DataTable";
import React from "react";
import { columns } from "@/components/inventory/columns";
import { getInventoryList } from "@/actions/inventory.action";

const getData = async (): Promise<Inventory[]> => {
  const inventoryData = await getInventoryList();

  return inventoryData;
};

const Inventory = async () => {
  const data = await getData();
  return (
    <div className="py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Inventory;
