"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface InventoryContextType {
  inventoryList: Inventory[];
  setInventoryList: (inventoryList: Inventory[]) => void;
  addInventoryRecord: (inventory: Inventory) => void;
  removeInventory: (inventoryId: string) => void;
}

interface InventoryProviderProps {
  children: ReactNode;
}

const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined
);

export const InventoryProvider = ({ children }: InventoryProviderProps) => {
  const [inventoryList, setInventories] = useState<Inventory[]>([]);

  const addInventoryRecord = (inventory: Inventory): void => {
    const original = [...inventoryList];

    const newList = original.concat(inventory);
    setInventories(newList);
  };

  const setInventoryList = (inventoryList: Inventory[]): void => {
    setInventories(inventoryList);
  };

  const removeInventory = (itemId: string) => {
    setInventories((currentList) =>
      currentList.filter((item) => item.id !== itemId)
    );
  };

  const value: InventoryContextType = {
    inventoryList,
    setInventoryList,
    addInventoryRecord,
    removeInventory,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};
