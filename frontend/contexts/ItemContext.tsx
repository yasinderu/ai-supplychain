"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface ItemContextType {
  itemList: Item[];
  setItemList: (iteList: Item[]) => void;
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
}

interface ItemProviderProps {
  children: ReactNode;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider = ({ children }: ItemProviderProps) => {
  const [itemList, setItems] = useState<Item[]>([]);

  const addItem = (item: Item): void => {
    const original = [...itemList];

    const newList = original.concat(item);
    setItems(newList);
  };

  const setItemList = (itemList: Item[]): void => {
    setItems(itemList);
  };

  const removeItem = (itemId: string) => {
    setItems((currentList) => currentList.filter((item) => item.id !== itemId));
  };

  const value: ItemContextType = {
    itemList,
    setItemList,
    addItem,
    removeItem,
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItem = (): ItemContextType => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItem must be used within an ItemProvider");
  }
  return context;
};
