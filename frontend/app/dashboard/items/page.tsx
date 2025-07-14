import { deleteItem, getItemList } from "@/actions/item.action";
import CreateItemModal from "@/components/items/CreateItemModal";
import ItemList from "@/components/items/ItemList";
import { cookies } from "next/headers";
import React from "react";

const getData = async (): Promise<Item[]> => {
  const itemData = await getItemList();

  return itemData;
};

const ItemManagement = async () => {
  const data = await getData();
  const cookieStore = await cookies();

  const token = cookieStore.get("session_token")?.value;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-10 items-center">
        <h1 className="text-4xl">Item List</h1>
        <CreateItemModal />
      </div>
      <ItemList deleteItemAction={deleteItem} items={data} />
    </div>
  );
};

export default ItemManagement;
