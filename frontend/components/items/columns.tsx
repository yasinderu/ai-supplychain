"use client"

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: "Item Name"
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "category",
    header: "Category"
  },
  {
    accessorKey: "sku",
    header: "SKU"
  }
]