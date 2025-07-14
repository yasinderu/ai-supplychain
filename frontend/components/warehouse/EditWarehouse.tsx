"use client";

import React, { useState } from "react";
import EditWarehouseForm from "./EditWarehouseForm";
import CustomCard from "@/components/CustomCard";

interface EditWarehouseProps {
  warehouse: Warehouse;
}

const EditWarehouse = ({ warehouse }: EditWarehouseProps) => {
  const [formDisabled, setFormDisabled] = useState(true);
  return (
    <>
      <CustomCard
        title="View and edit warehouse"
        formDisabled={formDisabled}
        isEdit={true}
        setFormDisabled={() => setFormDisabled(!formDisabled)}
      >
        <EditWarehouseForm warehouse={warehouse} formDisabled={formDisabled} />
      </CustomCard>
    </>
  );
};

export default EditWarehouse;
