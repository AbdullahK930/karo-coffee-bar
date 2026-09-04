export type MenuItem = {
  name: string;
  price: number;
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
  note?: string;
};

export const menuCategories: MenuCategory[] = [
  {
    id: "hot-coffee",
    label: "Hot Coffee",
    items: [
      { name: "Espresso", price: 350 },
      { name: "Americano", price: 550 },
      { name: "Latte", price: 750 },
      { name: "Flat White", price: 750 },
      { name: "Karo Signature", price: 800 },
      { name: "Cappuccino", price: 750 },
      { name: "Mocha", price: 800 },
      { name: "Spanish", price: 800 },
      { name: "Cortado", price: 750 },
      { name: "Hot Chocolate", price: 800 },
    ],
  },
  {
    id: "iced-coffee",
    label: "Iced Coffee",
    items: [
      { name: "Americano", price: 650 },
      { name: "Latte", price: 850 },
      { name: "Mocha", price: 900 },
      { name: "Spanish", price: 850 },
    ],
    note: "Make it a frappe: add Rs 120, any flavour.",
  },
  {
    id: "matcha",
    label: "Matcha",
    items: [
      { name: "Vanilla", price: 950 },
      { name: "Coconut", price: 950 },
      { name: "Coconut Cloud", price: 1000 },
      { name: "Strawberry", price: 1050 },
      { name: "Mix Berry", price: 1050 },
    ],
  },
  {
    id: "signature",
    label: "Signature Drinks",
    items: [
      { name: "Karo Signature Iced Latte", price: 900 },
      { name: "Tiramisu Iced Latte", price: 900 },
      { name: "Pistachio Iced Latte", price: 1000 },
      { name: "Nutella Latte", price: 1000 },
      { name: "Peach Berry Cooler", price: 900 },
      { name: "Strawberry Cooler", price: 900 },
      { name: "Mix Berry Mojito", price: 900 },
      { name: "Pineapple Lemonade", price: 700 },
      { name: "Peach Passion Fruit Iced Tea", price: 950 },
      { name: "Coco Cloud Espresso", price: 1000 },
      { name: "Mix Berry Coco", price: 900 },
      { name: "Pina Colada", price: 850 },
      { name: "Vanilla Protein Shake", price: 1000 },
    ],
  },
];

export const flavourShots = ["French Vanilla", "Coconut", "Caramel", "Hazelnut"];

export const addOns = [
  { name: "Extra Shot Espresso", price: 150 },
  { name: "Lactose Free Milk", price: 100 },
  { name: "Skimmed Milk", price: 100 },
  { name: "Extra Flavour Shot", price: 80 },
];
