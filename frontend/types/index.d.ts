type Item = {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string | undefined;
};

type Warehouse = {
  id: string;
  name: string;
  address: string | null;
};

type Inventory = {
  id: string;
  item: Item;
  location: Warehouse;
  quantity: number;
  status: "in_stock" | "defect" | "transfered";
};

declare type SearchParamsProps = {
  params: {
    [key: string]: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
