export type Category = "donuts" | "cupcakes" | "pastries" | "savoury" | "drinks";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  blurb: string;
  tag?: string;
};

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "donuts", label: "Donuts" },
  { id: "cupcakes", label: "Cupcakes & Cakes" },
  { id: "pastries", label: "Pastries" },
  { id: "savoury", label: "Savoury" },
  { id: "drinks", label: "Shakes & Coffee" },
];

export const PRODUCTS: Product[] = [
  {
    id: "pink-sprinkle",
    name: "Pink Sprinkle Donut",
    price: 2500,
    image: "/images/donut-pink.webp",
    category: "donuts",
    blurb: "Strawberry glaze, rainbow sprinkles, pillowy brioche dough.",
    tag: "Bestseller",
  },
  {
    id: "cloud-glaze",
    name: "Cloud Glaze Donut",
    price: 2800,
    image: "/images/donut-float.webp",
    category: "donuts",
    blurb: "Laminated dough, a thick pink glaze that drips down the sides.",
  },
  {
    id: "choco-drip",
    name: "Choco Drip Donut",
    price: 2700,
    image: "/images/donut-drip.webp",
    category: "donuts",
    blurb: "Dipped twice in dark Ghanaian cocoa ganache.",
  },
  {
    id: "choco-crunch",
    name: "Choco Crunch Donut",
    price: 3000,
    image: "/images/donut-choco.webp",
    category: "donuts",
    blurb: "Ganache, chocolate shavings and toasted groundnut crumble.",
    tag: "New",
  },
  {
    id: "donut-box",
    name: "Mixed Donut Box (3)",
    price: 7200,
    image: "/images/donut-trio.webp",
    category: "donuts",
    blurb: "Pink, milk choc and dark choc. Good for sharing, or not.",
  },
  {
    id: "vanilla-cupcake",
    name: "Vanilla Funfetti Cupcake",
    price: 2200,
    image: "/images/cupcake-vanilla.webp",
    category: "cupcakes",
    blurb: "Madagascar vanilla sponge, whipped buttercream swirl.",
  },
  {
    id: "lollipop-cupcake",
    name: "Lollipop Party Cupcake",
    price: 3500,
    image: "/images/cupcake-lollipop.webp",
    category: "cupcakes",
    blurb: "Raspberry sponge, ganache drip, white choc bark and a lolly.",
    tag: "Party pick",
  },
  {
    id: "strawberry-cupcake",
    name: "Choco Strawberry Cupcake",
    price: 3200,
    image: "/images/cupcake-strawberry.webp",
    category: "cupcakes",
    blurb: "Dark chocolate base, strawberry buttercream, dipped berry.",
  },
  {
    id: "berry-cupcake",
    name: "Strawberry Cloud Cupcake",
    price: 2800,
    image: "/images/cupcake-berry.webp",
    category: "cupcakes",
    blurb: "Vanilla sponge, strawberry buttercream, fresh berries on top.",
  },
  {
    id: "shortcake",
    name: "Strawberry Shortcake Slice",
    price: 4500,
    image: "/images/shortcake.webp",
    category: "cupcakes",
    blurb: "Three layers of sponge, whipped cream and chopped strawberries.",
  },
  {
    id: "banoffee-cheesecake",
    name: "Banoffee Cheesecake",
    price: 5000,
    image: "/images/banoffee-cheesecake.webp",
    category: "cupcakes",
    blurb: "Peanut cheesecake, dulce de leche, banana and toasted walnuts.",
    tag: "New",
  },
  {
    id: "cinnamon-roll",
    name: "Cinnamon Swirl (2)",
    price: 3800,
    image: "/images/cinnamon-rolls.webp",
    category: "pastries",
    blurb: "Buttery laminated swirls, brown sugar and cinnamon.",
    tag: "Morning fave",
  },
  {
    id: "cream-horns",
    name: "Vanilla Cream Horns (3)",
    price: 4200,
    image: "/images/cream-horns.webp",
    category: "pastries",
    blurb: "Flaky puff pastry, piped vanilla custard, icing sugar snow.",
  },
  {
    id: "pain-au-chocolat",
    name: "Pain au Chocolat",
    price: 2600,
    image: "/images/pain-au-chocolat.webp",
    category: "pastries",
    blurb: "Butter-laminated dough wrapped around two dark chocolate batons.",
  },
  {
    id: "grilled-cheese",
    name: "Bacon Grilled Cheese",
    price: 6500,
    image: "/images/grilled-cheese.webp",
    category: "savoury",
    blurb: "Toasted sourdough, cheddar, mozzarella and crispy bacon.",
    tag: "Lunch",
  },
  {
    id: "iced-latte",
    name: "Foodx Iced Latte",
    price: 3500,
    image: "/images/iced-coffee.webp",
    category: "drinks",
    blurb: "Double espresso, cold milk and a lot of ice.",
    tag: "Bestseller",
  },
  {
    id: "boba-frappe",
    name: "Caramel Boba Frappe",
    price: 4500,
    image: "/images/boba-frappe.webp",
    category: "drinks",
    blurb: "Caramel coffee, brown-sugar pearls, cream and choc drizzle.",
  },
  {
    id: "strawberry-shake",
    name: "Strawberry Crunch Shake",
    price: 4200,
    image: "/images/shake-strawberry.webp",
    category: "drinks",
    blurb: "Fresh strawberries, vanilla ice cream, groundnut crunch.",
  },
  {
    id: "shake-trio",
    name: "Shake Flight (3)",
    price: 11000,
    image: "/images/milkshake-trio.webp",
    category: "drinks",
    blurb: "Choc-strawberry, strawberries & cream, double chocolate.",
  },
];

export const BEST_SELLERS = ["pink-sprinkle", "iced-latte", "berry-cupcake", "grilled-cheese"].map(
  (id) => PRODUCTS.find((p) => p.id === id)!
);

export const PREMIUM = ["choco-crunch", "boba-frappe", "banoffee-cheesecake", "cream-horns"].map(
  (id) => PRODUCTS.find((p) => p.id === id)!
);

export const formatNaira = (n: number) => "₦" + n.toLocaleString("en-NG");

export const BUSINESS = {
  name: "Foodx",
  street: "Admiralty Way",
  area: "Lekki Phase 1",
  city: "Lagos, Nigeria",
  phone: "+234 800 000 0000",
  whatsapp: "2348000000000",
  email: "hello@foodx.ng",
  hours: [
    { d: "Mon – Fri", h: "7:00am – 9:00pm" },
    { d: "Saturday", h: "8:00am – 10:00pm" },
    { d: "Sunday", h: "10:00am – 8:00pm" },
  ],
};
