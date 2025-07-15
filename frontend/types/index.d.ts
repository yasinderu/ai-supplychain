interface User {
  username: string;
  id: string;
}

interface Item {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string | undefined;
}

interface Warehouse {
  id: string;
  name: string;
  address: string | null;
}

interface Inventory {
  id: string;
  item: Item;
  location: Warehouse;
  quantity: number;
  status: "in_stock" | "defect" | "transfered";
}

declare type SearchParamsProps = {
  params: {
    [key: string]: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

declare type AIQuestionType = {
  question: string;
};

declare type AIAnswerType = {
  answer: string | null;
};

interface Chat {
  id: string;
  text: string;
  user: User;
  sender: string;
}
