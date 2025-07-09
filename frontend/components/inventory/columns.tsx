"use client"

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "item.name",
    header: "Item"
  },
  {
    accessorKey: "location.name",
    header: "Location"
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    accessorKey: "status",
    header: "Status"
  }
]