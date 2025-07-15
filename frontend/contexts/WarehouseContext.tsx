"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface WarehouseContextType {
  warehouseList: Warehouse[];
  setWarehouseList: (warehouseList: Warehouse[]) => void;
  addNewWarehouse: (warehosue: Warehouse) => void;
  removeWarehouse: (warehouseId: string) => void;
}

interface WarehouseProviderProps {
  children: ReactNode;
}

const WarehouseContext = createContext<WarehouseContextType | undefined>(
  undefined
);

export const WarehouseProvider = ({ children }: WarehouseProviderProps) => {
  const [warehouseList, setWarehouses] = useState<Warehouse[]>([]);

  const addNewWarehouse = (warehouse: Warehouse): void => {
    const original = [...warehouseList];

    const newList = original.concat(warehouse);
    setWarehouses(newList);
  };

  const setWarehouseList = (warehouseList: Warehouse[]): void => {
    setWarehouses(warehouseList);
  };

  const removeWarehouse = (warehouseID: string) => {
    setWarehouses((currentList) =>
      currentList.filter((warehouse) => warehouse.id !== warehouseID)
    );
  };

  const value: WarehouseContextType = {
    warehouseList,
    setWarehouseList,
    addNewWarehouse,
    removeWarehouse,
  };

  return (
    <WarehouseContext.Provider value={value}>
      {children}
    </WarehouseContext.Provider>
  );
};

export const useWarehouse = (): WarehouseContextType => {
  const context = useContext(WarehouseContext);
  if (!context) {
    throw new Error("useWarehouse must be used within an WarehouseProvider");
  }
  return context;
};
