import { getItemDetail } from "@/actions/item.action";
import EditItem from "@/components/items/EditItem";
import React from "react";

const ItemDetails = async ({ params }: SearchParamsProps) => {
  const { itemId } = await params;
  const item = await getItemDetail(itemId);

  return (
    <div className="flex items-center justify-center">
      <EditItem item={item} />
    </div>
  );
};

export default ItemDetails;
