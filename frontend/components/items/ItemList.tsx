"use client";

import React, { useState } from "react";
import { DataTable } from "../DataTable";
import { getColumns } from "./columns";

interface ItemListProps {
  items: Item[];
  deleteItemAction: (itemId: string) => Promise<any>;
}

const ItemList = ({ items, deleteItemAction }: ItemListProps) => {
  const [itemList, setItemList] = useState(items);
  const deleteItem = async (itemId: string) => {
    const originalData = [...itemList];
    try {
      await deleteItemAction(itemId);

      setItemList((currentList) =>
        currentList.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      setItemList(originalData);
      console.log(error);
    }
  };

  const columns = getColumns(deleteItem);
  return (
    <>
      <DataTable columns={columns} data={itemList} />
    </>
  );
};

export default ItemList;
