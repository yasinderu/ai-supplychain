import { getWarehouseDetail } from "@/actions/warehouse.action";
import EditWarehouse from "@/components/warehouse/EditWarehouse";
import React from "react";

const WarehouseDetails = async ({ params }: SearchParamsProps) => {
  const { warehouseId } = await params;
  const warehouse = await getWarehouseDetail(warehouseId);

  return (
    <div className="flex items-center justify-center">
      <EditWarehouse warehouse={warehouse} />
    </div>
  );
};

export default WarehouseDetails;
