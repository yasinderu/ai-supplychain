"use client";

import React, { useState } from "react";
import InventoryForm from "./InventoryForm";
import CustomCard from "../CustomCard";

interface EditInventoryProps {
  items: Item[];
  warehouses: Warehouse[];
  inventory: Inventory;
}

const EditInventory = (props: EditInventoryProps) => {
  const [formDisabled, setFormDisabled] = useState(true);
  return (
    <>
      <CustomCard
        title="View and edit inventory"
        isEdit={true}
        setFormDisabled={() => setFormDisabled(!formDisabled)}
        formDisabled={formDisabled}
      >
        <InventoryForm
          inventory={props.inventory}
          warehouses={props.warehouses}
          items={props.items}
          formDisabled={formDisabled}
        />
      </CustomCard>
    </>
  );
};

export default EditInventory;
