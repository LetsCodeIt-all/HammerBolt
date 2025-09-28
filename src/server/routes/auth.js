import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = "supersecret123";

// ✅ Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // save new user
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    res.status(201).json({ message: "User created", userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return res.status(401).json({ message: "Invalid password" });

    // create JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // 🟢 Find the unique Cart by userId and include the list of Products
    const userCart = await prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        products: true, // Fetches the array of related Product records
      },
    });

    if (userCart) {
      // Returns an object: { id: ..., userId: ..., products: [...] }
      res.json(userCart);
    } else {
      res.status(404).json({ message: "Cart not found for this user." });
    }
  } catch (err) {
    console.error("Prisma Error fetching cart:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error: Could not fetch cart." });
  }
});
router.post("/cart", async (req, res) => {
  // We only need userId and productId to manage the many-to-many relation.
  // The 'product' details are not needed here if the Product already exists.
  const { userId, productId } = req.body;

  try {
    // 1. UPSERT THE CART: Ensures the user has a Cart record.
    const cart = await prisma.Cart.upsert({
      where: { userId: userId }, // Look for a Cart with this userId
      update: {}, // If found, do nothing
      create: { userId: userId }, // If not found, create a new Cart
    });

    // 2. CONNECT THE PRODUCT: Add the product to the cart's 'products' list.
    // This is done via an update operation on the Cart.
    const updatedCart = await prisma.Cart.update({
      where: { id: cart.id },
      data: {
        products: {
          // Connect the existing Product to this Cart
          connect: { id: productId },
        },
      },
      // You may want to include the product list in the response
      include: {
        products: true,
      },
    });

    res.status(201).json({
      message: "Item successfully added to cart.",
      cart: updatedCart,
    });
  } catch (err) {
    // Log the actual error on the server for debugging
    console.error("Error adding item to cart:", err);

    // Check for a specific error (e.g., trying to add the same item twice)
    if (err.code === "P2014") {
      // P2014 is Prisma's code for relation violations
      return res.status(409).json({ error: "Product is already in the cart." });
    }

    res
      .status(500)
      .json({ error: "Internal Server Error. Could not add item." });
  }
});
export default router;
