import {
  PrismaClient,
  ProductStatus,
  UserRole,
} from "../src/generated/prisma/client.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const categories = {
  electronics: "6589fe75-231e-4e9f-8189-f68f20538acb",
  clothing: "0ec8480a-c3d0-4d05-bb35-c1582fd98bf0",
  homeKitchen: "0f9e807f-7061-48a8-9fa2-8431be823f42",
  beauty: "34a339a8-df7f-4c3e-8376-7107e9a07ea7",
  books: "f93f1cfc-e8be-429a-aeef-8e60ececfa19",
  sports: "e8c84762-225d-4ffa-b23e-7a3025b1087f",
};

type ProductSeed = {
  name: string;
  description: string;
  stock: number;
  price: number;
  categoryId: string;
};

const products: ProductSeed[] = [
  // Electronics
  {
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with adjustable sensitivity and USB receiver.",
    stock: 25,
    price: 59900,
    categoryId: categories.electronics,
  },
  {
    name: "Mechanical Keyboard",
    description:
      "Compact mechanical keyboard with tactile keys and RGB lighting.",
    stock: 15,
    price: 189900,
    categoryId: categories.electronics,
  },
  {
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with clear audio and up to 10 hours of battery life.",
    stock: 20,
    price: 149900,
    categoryId: categories.electronics,
  },
  {
    name: "USB-C Cable",
    description:
      "Durable USB-C charging and data cable suitable for phones and laptops.",
    stock: 40,
    price: 29900,
    categoryId: categories.electronics,
  },
  {
    name: "Power Bank",
    description: "10,000mAh portable power bank with dual USB output.",
    stock: 18,
    price: 89900,
    categoryId: categories.electronics,
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for comfortable desk use.",
    stock: 12,
    price: 119900,
    categoryId: categories.electronics,
  },
  {
    name: "Wireless Earbuds",
    description:
      "Compact wireless earbuds with charging case and touch controls.",
    stock: 22,
    price: 179900,
    categoryId: categories.electronics,
  },
  {
    name: "USB Hub",
    description:
      "4-port USB hub for connecting multiple peripherals to a laptop.",
    stock: 30,
    price: 69900,
    categoryId: categories.electronics,
  },
  {
    name: "Smart LED Bulb",
    description:
      "Wi-Fi enabled LED bulb with adjustable brightness and color temperature.",
    stock: 16,
    price: 79900,
    categoryId: categories.electronics,
  },
  {
    name: "Webcam",
    description:
      "Full HD webcam suitable for video calls, meetings, and online classes.",
    stock: 14,
    price: 129900,
    categoryId: categories.electronics,
  },

  // Clothing
  {
    name: "Classic Cotton T-Shirt",
    description: "Comfortable regular-fit cotton T-shirt for everyday wear.",
    stock: 35,
    price: 49900,
    categoryId: categories.clothing,
  },
  {
    name: "Casual Shirt",
    description:
      "Lightweight casual shirt suitable for everyday and semi-formal occasions.",
    stock: 20,
    price: 89900,
    categoryId: categories.clothing,
  },
  {
    name: "Slim Fit Jeans",
    description: "Comfortable denim jeans with a modern slim-fit design.",
    stock: 18,
    price: 129900,
    categoryId: categories.clothing,
  },
  {
    name: "Pullover Hoodie",
    description: "Soft fleece hoodie designed for comfortable casual wear.",
    stock: 15,
    price: 119900,
    categoryId: categories.clothing,
  },
  {
    name: "Polo T-Shirt",
    description: "Classic polo T-shirt made from breathable cotton fabric.",
    stock: 25,
    price: 69900,
    categoryId: categories.clothing,
  },
  {
    name: "Denim Jacket",
    description: "Versatile denim jacket suitable for casual outfits.",
    stock: 10,
    price: 179900,
    categoryId: categories.clothing,
  },
  {
    name: "Track Pants",
    description:
      "Comfortable stretchable track pants for workouts and daily use.",
    stock: 22,
    price: 79900,
    categoryId: categories.clothing,
  },
  {
    name: "Formal Trousers",
    description:
      "Regular-fit trousers suitable for office and formal occasions.",
    stock: 16,
    price: 99900,
    categoryId: categories.clothing,
  },
  {
    name: "Cotton Shorts",
    description: "Lightweight cotton shorts designed for casual everyday use.",
    stock: 28,
    price: 59900,
    categoryId: categories.clothing,
  },
  {
    name: "Baseball Cap",
    description:
      "Adjustable casual cap with a curved visor and comfortable fit.",
    stock: 30,
    price: 39900,
    categoryId: categories.clothing,
  },

  // Home & Kitchen
  {
    name: "Stainless Steel Water Bottle",
    description:
      "Reusable stainless steel bottle designed to keep drinks fresh.",
    stock: 30,
    price: 49900,
    categoryId: categories.homeKitchen,
  },
  {
    name: "Ceramic Coffee Mug",
    description:
      "Simple ceramic mug suitable for coffee, tea, and other beverages.",
    stock: 25,
    price: 29900,
    categoryId: categories.homeKitchen,
  },
  {
    name: "Storage Box",
    description:
      "Multipurpose plastic storage box for organizing household items.",
    stock: 20,
    price: 39900,
    categoryId: categories.homeKitchen,
  },
  {
    name: "Non-Stick Frying Pan",
    description: "Durable non-stick frying pan suitable for everyday cooking.",
    stock: 12,
    price: 89900,
    categoryId: categories.homeKitchen,
  },
  {
    name: "Table Lamp",
    description: "Compact LED table lamp suitable for study and work desks.",
    stock: 18,
    price: 69900,
    categoryId: categories.homeKitchen,
  },
  {
    name: "Kitchen Knife Set",
    description:
      "Set of essential stainless steel kitchen knives with storage block.",
    stock: 10,
    price: 119900,
    categoryId: categories.homeKitchen,
  },
  {
    name: "Cutting Board",
    description: "Durable food-grade cutting board for everyday kitchen use.",
    stock: 22,
    price: 34900,
    categoryId: categories.homeKitchen,
  },
  {
    name: "Lunch Box",
    description: "Three-compartment lunch box with secure locking lid.",
    stock: 28,
    price: 59900,
    categoryId: categories.homeKitchen,
  },
  {
    name: "Electric Kettle",
    description: "1.5-liter electric kettle with automatic shut-off feature.",
    stock: 14,
    price: 109900,
    categoryId: categories.homeKitchen,
  },
  {
    name: "Spice Rack",
    description: "Compact spice rack for neatly organizing kitchen spices.",
    stock: 16,
    price: 79900,
    categoryId: categories.homeKitchen,
  },

  // Beauty & Personal Care
  {
    name: "Face Wash",
    description:
      "Gentle daily face wash designed to remove dirt and excess oil.",
    stock: 25,
    price: 29900,
    categoryId: categories.beauty,
  },
  {
    name: "Shampoo",
    description: "Everyday shampoo formulated for clean and refreshed hair.",
    stock: 30,
    price: 39900,
    categoryId: categories.beauty,
  },
  {
    name: "Body Lotion",
    description: "Moisturizing body lotion for everyday skin care.",
    stock: 20,
    price: 34900,
    categoryId: categories.beauty,
  },
  {
    name: "Hand Wash",
    description: "Mild liquid hand wash suitable for frequent daily use.",
    stock: 35,
    price: 19900,
    categoryId: categories.beauty,
  },
  {
    name: "Hair Oil",
    description:
      "Nourishing hair oil suitable for regular scalp and hair care.",
    stock: 24,
    price: 29900,
    categoryId: categories.beauty,
  },
  {
    name: "Lip Balm",
    description: "Moisturizing lip balm designed to help prevent dry lips.",
    stock: 40,
    price: 14900,
    categoryId: categories.beauty,
  },
  {
    name: "Bath Soap",
    description: "Gentle cleansing soap suitable for everyday bathing.",
    stock: 35,
    price: 9900,
    categoryId: categories.beauty,
  },
  {
    name: "Sunscreen",
    description: "Lightweight sunscreen designed for daily outdoor protection.",
    stock: 18,
    price: 49900,
    categoryId: categories.beauty,
  },
  {
    name: "Face Moisturizer",
    description:
      "Lightweight moisturizer for maintaining soft and hydrated skin.",
    stock: 22,
    price: 39900,
    categoryId: categories.beauty,
  },
  {
    name: "Hair Comb",
    description: "Durable wide-tooth comb suitable for everyday hair care.",
    stock: 30,
    price: 12900,
    categoryId: categories.beauty,
  },

  // Books
  {
    name: "Python Programming Basics",
    description:
      "Beginner-friendly introduction to Python programming concepts.",
    stock: 15,
    price: 59900,
    categoryId: categories.books,
  },
  {
    name: "Clean Code",
    description:
      "Practical guide to writing readable and maintainable software.",
    stock: 10,
    price: 79900,
    categoryId: categories.books,
  },
  {
    name: "The Alchemist",
    description:
      "Inspirational fiction about following dreams and discovering purpose.",
    stock: 20,
    price: 29900,
    categoryId: categories.books,
  },
  {
    name: "Atomic Habits",
    description:
      "Practical ideas for building good habits and improving daily routines.",
    stock: 18,
    price: 49900,
    categoryId: categories.books,
  },
  {
    name: "The Psychology of Money",
    description:
      "Introduction to the behavioral aspects of money and investing.",
    stock: 14,
    price: 59900,
    categoryId: categories.books,
  },
  {
    name: "Think and Grow Rich",
    description:
      "Classic personal development book focused on mindset and success.",
    stock: 12,
    price: 34900,
    categoryId: categories.books,
  },
  {
    name: "Introduction to Algorithms",
    description:
      "Comprehensive introduction to fundamental computer algorithms.",
    stock: 8,
    price: 129900,
    categoryId: categories.books,
  },
  {
    name: "Rich Dad Poor Dad",
    description:
      "Personal finance book discussing financial education and investing.",
    stock: 16,
    price: 39900,
    categoryId: categories.books,
  },
  {
    name: "Deep Work",
    description:
      "Guide to improving concentration and productive focused work.",
    stock: 15,
    price: 44900,
    categoryId: categories.books,
  },
  {
    name: "The Pragmatic Programmer",
    description: "Software development practices for professional programmers.",
    stock: 10,
    price: 89900,
    categoryId: categories.books,
  },

  // Sports & Fitness
  {
    name: "Football",
    description:
      "Durable size 5 football suitable for training and recreational games.",
    stock: 20,
    price: 79900,
    categoryId: categories.sports,
  },
  {
    name: "Yoga Mat",
    description: "Non-slip exercise mat suitable for yoga and home workouts.",
    stock: 25,
    price: 59900,
    categoryId: categories.sports,
  },
  {
    name: "Skipping Rope",
    description:
      "Adjustable skipping rope suitable for cardio and fitness training.",
    stock: 30,
    price: 24900,
    categoryId: categories.sports,
  },
  {
    name: "Gym Gloves",
    description:
      "Comfortable workout gloves with grip protection for weight training.",
    stock: 18,
    price: 39900,
    categoryId: categories.sports,
  },
  {
    name: "Resistance Bands",
    description: "Set of resistance bands for strength and mobility exercises.",
    stock: 22,
    price: 49900,
    categoryId: categories.sports,
  },
  {
    name: "Water Bottle",
    description:
      "Lightweight sports water bottle designed for workouts and outdoor use.",
    stock: 28,
    price: 34900,
    categoryId: categories.sports,
  },
  {
    name: "Basketball",
    description:
      "Standard-size basketball suitable for practice and recreational play.",
    stock: 15,
    price: 89900,
    categoryId: categories.sports,
  },
  {
    name: "Hand Grip",
    description:
      "Adjustable hand grip trainer for improving hand and forearm strength.",
    stock: 25,
    price: 19900,
    categoryId: categories.sports,
  },
  {
    name: "Fitness Towel",
    description:
      "Lightweight absorbent towel designed for workouts and sports activities.",
    stock: 30,
    price: 24900,
    categoryId: categories.sports,
  },
  {
    name: "Sports Backpack",
    description:
      "Spacious sports backpack with compartments for shoes and accessories.",
    stock: 12,
    price: 99900,
    categoryId: categories.sports,
  },
];

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  console.log("🌱 Starting database seed...");

  // --------------------------------------------------
  // Products
  // --------------------------------------------------

  for (const product of products) {
    const slug = createSlug(product.name);

    await prisma.product.upsert({
      where: {
        slug,
      },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
        status: ProductStatus.ACTIVE,
      },
      create: {
        name: product.name,
        slug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
        status: ProductStatus.ACTIVE,
      },
    });
  }

  console.log(`✅ Seeded ${products.length} products`);
  console.log("🌱 Database seed completed!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
