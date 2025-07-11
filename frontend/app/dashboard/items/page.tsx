import { getItemList } from "@/actions/item.action";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/items/columns";
import CreateItemModal from "@/components/items/CreateItemModal";
import React from "react";

const getData = async (): Promise<Item[]> => {
  const itemData = await getItemList();

  return itemData;
};

const ItemManagement = async () => {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-10 items-center">
        <h1 className="text-4xl">Item List</h1>
        <CreateItemModal />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ItemManagement;
