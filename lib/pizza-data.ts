export type PizzaCategory = "salgado" | "doce" | "bebida";

export interface PizzaFlavor {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  ingredients: string[];
  image: string;
  price: string;
  badge: string;
  category: PizzaCategory;
  colors: {
    bg: string;
    bgRgb: string;
    text: string;
    accent: string;
    accentText: string;
    muted: string;
    ingredientBg: string;
    ingredientText: string;
    dotActive: string;
    dotInactive: string;
  };
}

export const pizzaFlavors: PizzaFlavor[] = [
  {
    id: "margherita",
    name: "Margherita",
    subtitle: "A Classica Italiana",
    description:
      "A simplicidade elevada ao sublime. Molho de tomate San Marzano, mozzarella di bufala fresca e manjericao colhido na hora.",
    ingredients: [
      "Tomate San Marzano",
      "Mozzarella di Bufala",
      "Manjericao Fresco",
      "Azeite Extra Virgem",
    ],
    image: "/images/pizza-margherita.webp",
    price: "R$ 49,90",
    badge: "Classica",
    category: "salgado",
    colors: {
      bg: "#1a0f0a",
      bgRgb: "26, 15, 10",
      text: "#fef3e2",
      accent: "#d4442a",
      accentText: "#fef3e2",
      muted: "#8a7b6e",
      ingredientBg: "rgba(212, 68, 42, 0.12)",
      ingredientText: "#e8a090",
      dotActive: "#d4442a",
      dotInactive: "rgba(212, 68, 42, 0.25)",
    },
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    subtitle: "Intensa & Marcante",
    description:
      "Camadas generosas de pepperoni artesanal levemente picante, sobre um leito de queijo dourado e molho secreto da casa.",
    ingredients: [
      "Pepperoni Artesanal",
      "Blend de Queijos",
      "Molho Secreto",
      "Oregano Siciliano",
    ],
    image: "/images/pizza-pepperoni.webp",
    price: "R$ 54,90",
    badge: "Favorita",
    category: "salgado",
    colors: {
      bg: "#140a08",
      bgRgb: "20, 10, 8",
      text: "#fff5eb",
      accent: "#e8640a",
      accentText: "#fff5eb",
      muted: "#7a6b5e",
      ingredientBg: "rgba(232, 100, 10, 0.12)",
      ingredientText: "#f0b880",
      dotActive: "#e8640a",
      dotInactive: "rgba(232, 100, 10, 0.25)",
    },
  },
  {
    id: "quattro-formaggi",
    name: "Quattro Formaggi",
    subtitle: "Cremosa & Sofisticada",
    description:
      "Quatro queijos nobres fundidos em harmonia perfeita. Gorgonzola, parmesao, mozzarella e provolone criam uma experiencia unica.",
    ingredients: [
      "Gorgonzola DOP",
      "Parmesao 24 meses",
      "Mozzarella Fresca",
      "Provolone Defumado",
    ],
    image: "/images/pizza-quattro.webp",
    price: "R$ 59,90",
    badge: "Premium",
    category: "salgado",
    colors: {
      bg: "#0d0f14",
      bgRgb: "13, 15, 20",
      text: "#f5f0e8",
      accent: "#c9a84c",
      accentText: "#0d0f14",
      muted: "#6e7078",
      ingredientBg: "rgba(201, 168, 76, 0.12)",
      ingredientText: "#d4c490",
      dotActive: "#c9a84c",
      dotInactive: "rgba(201, 168, 76, 0.25)",
    },
  },
  {
    id: "portuguesa",
    name: "Portuguesa",
    subtitle: "Brasileira de Coracao",
    description:
      "O sabor que conquistou o Brasil. Presunto, ovos, cebola, azeitonas e pimentao verde em uma combinacao irresistivel.",
    ingredients: [
      "Presunto Especial",
      "Ovos Caipira",
      "Cebola Roxa",
      "Azeitonas",
      "Pimentao Verde",
    ],
    image: "/images/pizza-portuguesa.webp",
    price: "R$ 52,90",
    badge: "Brasileira",
    category: "salgado",
    colors: {
      bg: "#0f120a",
      bgRgb: "15, 18, 10",
      text: "#f4f0e0",
      accent: "#5a8a3c",
      accentText: "#f4f0e0",
      muted: "#6e7560",
      ingredientBg: "rgba(90, 138, 60, 0.12)",
      ingredientText: "#a8c890",
      dotActive: "#5a8a3c",
      dotInactive: "rgba(90, 138, 60, 0.25)",
    },
  },
  {
    id: "chocolate",
    name: "Chocolate",
    subtitle: "Irresistivelmente Doce",
    description:
      "Uma explosao de chocolate para os amantes de doces. Chocolate ao leite derretido, granulado e morangos frescos.",
    ingredients: [
      "Chocolate ao Leite",
      "Chocolate Branco",
      "Granulado",
      "Morangos Frescos",
    ],
    image: "/images/pizza-morango.webp",
    price: "R$ 44,90",
    badge: "Doce",
    category: "doce",
    colors: {
      bg: "#1a0a0f",
      bgRgb: "26, 10, 15",
      text: "#fff0f5",
      accent: "#d946a6",
      accentText: "#fff0f5",
      muted: "#8a6e7b",
      ingredientBg: "rgba(217, 70, 166, 0.12)",
      ingredientText: "#e8a0d0",
      dotActive: "#d946a6",
      dotInactive: "rgba(217, 70, 166, 0.25)",
    },
  },
  {
    id: "brigadeiro",
    name: "Brigadeiro",
    subtitle: "O Sabor do Brasil",
    description:
      "A sobremesa brasileira mais amada em forma de pizza. Brigadeiro cremoso, granulado belga e leite condensado.",
    ingredients: [
      "Brigadeiro Cremoso",
      "Leite Condensado",
      "Granulado Belga",
      "Chocolate em Po",
    ],
    image: "/images/pizza-morango.webp",
    price: "R$ 42,90",
    badge: "Tradicional",
    category: "doce",
    colors: {
      bg: "#0a0a14",
      bgRgb: "10, 10, 20",
      text: "#f0e8ff",
      accent: "#8b5cf6",
      accentText: "#f0e8ff",
      muted: "#6e6078",
      ingredientBg: "rgba(139, 92, 246, 0.12)",
      ingredientText: "#c4a0f0",
      dotActive: "#8b5cf6",
      dotInactive: "rgba(139, 92, 246, 0.25)",
    },
  },
  {
    id: "coca-cola",
    name: "Coca-Cola",
    subtitle: "Gelada e Refrescante",
    description:
      "Coca-Cola gelada para acompanhar sua pizza. Disponível em lata 350ml ou garrafa 600ml.",
    ingredients: ["Lata 350ml", "Garrafa 600ml", "Zero Açúcar", "Tradicional"],
    image: "/images/pizza-margherita.webp",
    price: "R$ 6,90",
    badge: "Refrigerante",
    category: "bebida",
    colors: {
      bg: "#0a0a0a",
      bgRgb: "10, 10, 10",
      text: "#ffffff",
      accent: "#ff0000",
      accentText: "#ffffff",
      muted: "#888888",
      ingredientBg: "rgba(255, 0, 0, 0.12)",
      ingredientText: "#ff8888",
      dotActive: "#ff0000",
      dotInactive: "rgba(255, 0, 0, 0.25)",
    },
  },
  {
    id: "suco-laranja",
    name: "Suco de Laranja",
    subtitle: "Natural e Saudável",
    description:
      "Suco de laranja natural, feito na hora com laranjas selecionadas. Rico em vitamina C e sem conservantes.",
    ingredients: ["Laranja Natural", "Sem Açúcar", "Feito na Hora", "300ml"],
    image: "/images/pizza-quattro.webp",
    price: "R$ 8,90",
    badge: "Natural",
    category: "bebida",
    colors: {
      bg: "#1a1410",
      bgRgb: "26, 20, 16",
      text: "#fff8e8",
      accent: "#ff8c00",
      accentText: "#1a1410",
      muted: "#a08060",
      ingredientBg: "rgba(255, 140, 0, 0.12)",
      ingredientText: "#ffb860",
      dotActive: "#ff8c00",
      dotInactive: "rgba(255, 140, 0, 0.25)",
    },
  },
  {
    id: "agua-gas",
    name: "Água com Gás",
    subtitle: "Pura e Refrescante",
    description:
      "Água mineral com gás para uma experiência refrescante. Perfeita para acompanhar qualquer sabor de pizza.",
    ingredients: ["Água Mineral", "Gaseificada", "500ml", "Gelada"],
    image: "/images/pizza-portuguesa.webp",
    price: "R$ 4,90",
    badge: "Água",
    category: "bebida",
    colors: {
      bg: "#0a1418",
      bgRgb: "10, 20, 24",
      text: "#e8f4f8",
      accent: "#00bcd4",
      accentText: "#0a1418",
      muted: "#6088a0",
      ingredientBg: "rgba(0, 188, 212, 0.12)",
      ingredientText: "#80d8e8",
      dotActive: "#00bcd4",
      dotInactive: "rgba(0, 188, 212, 0.25)",
    },
  },
];
