type Item = {
  id: string
  name: string
  description: string
  sku: string
  category: string | null
}

type Warehouse = {
  id: string
  name: string
  address: string | null
}

type Inventory = {
  id: string
  item: Item
  location: Warehouse
  quantity: number
  status: string
}