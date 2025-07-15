import { getInventoryDetail } from "@/actions/inventory.action";
import { getItemList } from "@/actions/item.action";
import { getWarehouseList } from "@/actions/warehouse.action";
import EditInventory from "@/components/inventory/EditInventory";

const InventoryDetails = async ({ params }: SearchParamsProps) => {
  const { inventoryId } = await params;
  const inventoryDetails = await getInventoryDetail(inventoryId);
  const items = await getItemList();
  const warehouses = await getWarehouseList();

  return (
    <div className="flex items-center justify-center">
      <EditInventory
        items={items}
        warehouses={warehouses}
        inventory={inventoryDetails}
      />
    </div>
  );
};

export default InventoryDetails;
