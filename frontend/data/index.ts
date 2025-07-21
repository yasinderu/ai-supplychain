import {
  Home,
  Inbox,
  Search,
  ClipboardList,
  Warehouse,
  LogOut,
} from "lucide-react";

export const itemData: Item[] = [
  {
    id: "1",
    name: "Widget",
    description: "A Widget",
    category: "other",
    sku: "WT-011",
  },
  {
    id: "2",
    name: "Macbook Pro M4",
    description: "A powerful laptop from Apple",
    category: "Electronic",
    sku: "MP-201",
  },
  {
    id: "3",
    name: "LAN Cable",
    description: "A cable to connect devices locally",
    category: "Electronic",
    sku: "LC-321",
  },
  {
    id: "4",
    name: "Lenovo LCD Monitor",
    description: "A LCD monitor from lenovo",
    category: "Electronic",
    sku: "LL-435",
  },
];

export const SidebarItem = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Items",
    url: "/dashboard/items",
    icon: Inbox,
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: ClipboardList,
  },
  {
    title: "Warehouse",
    url: "/dashboard/warehouse",
    icon: Warehouse,
  },
  {
    title: "History",
    url: "#",
    icon: Search,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];
