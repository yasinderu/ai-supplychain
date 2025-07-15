"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { getColumns } from "./columns";
import { useInventory } from "@/contexts/InventoryContext";

interface InventoryListProps {
  inventories: Inventory[];
  deleteInventoryAction: (inventoryId: string) => Promise<any>;
}

const InventoryList = ({
  inventories,
  deleteInventoryAction,
}: InventoryListProps) => {
  useEffect(() => {
    setInventoryList(inventories);
  }, [inventories]);

  const { inventoryList, removeInventory, setInventoryList } = useInventory();

  const deleteInventory = async (inventoryId: string) => {
    const original = [...inventoryList];

    try {
      await deleteInventoryAction(inventoryId);

      removeInventory(inventoryId);
    } catch (error) {
      console.log(error);
      setInventoryList(original);
    }
  };

  const columns = getColumns(deleteInventory);

  return (
    <>
      <DataTable columns={columns} data={inventoryList} />
    </>
  );
};

export default InventoryList;
