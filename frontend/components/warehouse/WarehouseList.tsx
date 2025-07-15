"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { getColumns } from "./columns";
import { useWarehouse } from "@/contexts/WarehouseContext";

interface WarehouseLIstProps {
  warehouses: Warehouse[];
  deleteWarehouseAction: (warehouseId: string) => Promise<any>;
}

const WarehouseList = ({
  warehouses,
  deleteWarehouseAction,
}: WarehouseLIstProps) => {
  useEffect(() => {
    setWarehouseList(warehouses);
  }, warehouses);

  const { warehouseList, setWarehouseList, removeWarehouse } = useWarehouse();
  const deleteWarehouse = async (warehouseId: string) => {
    const original = [...warehouseList];
    try {
      await deleteWarehouseAction(warehouseId);

      removeWarehouse(warehouseId);
    } catch (error) {
      console.log(error);
      setWarehouseList(original);
    }
  };

  const columns = getColumns(deleteWarehouse);

  return (
    <>
      <DataTable columns={columns} data={warehouseList} />
    </>
  );
};

export default WarehouseList;
