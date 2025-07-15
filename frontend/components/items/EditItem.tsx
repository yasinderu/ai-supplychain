"use client";

import React, { useState } from "react";
import ItemForm from "./ItemForm";
import CustomCard from "../CustomCard";

interface EditItemProps {
  item: Item;
}

const EditItem = ({ item }: EditItemProps) => {
  const [formDisabled, setFormDisabled] = useState(true);
  return (
    <>
      <CustomCard
        title="View and edit item"
        isEdit={true}
        formDisabled={formDisabled}
        setFormDisabled={() => setFormDisabled(!formDisabled)}
      >
        <ItemForm formDisabled={formDisabled} item={item} />
      </CustomCard>
    </>
  );
};

export default EditItem;
