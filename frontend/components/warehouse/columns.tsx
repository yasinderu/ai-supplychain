"use client"

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Warehouse>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "address",
    header: "Address"
  },
]