"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { getColumns } from "./columns";
import { useItem } from "@/contexts/ItemContext";

interface ItemListProps {
  items: Item[];
  deleteItemAction: (itemId: string) => Promise<any>;
}

const ItemList = ({ items, deleteItemAction }: ItemListProps) => {
  const { itemList, setItemList, removeItem } = useItem();
  useEffect(() => {
    setItemList(items);
  }, [items]);

  const deleteItem = async (itemId: string) => {
    const originalData = [...itemList];
    try {
      const res = await deleteItemAction(itemId);

      // if (res) {
      removeItem(itemId);
      // }
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
