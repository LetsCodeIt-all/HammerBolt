import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
// ⚠️ CRITICAL SECURITY FIX: Load JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_only";

// -----------------------------------------------------
// 1. AUTH ROUTES (NO CHANGE HERE)
// -----------------------------------------------------

// ✅ Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // Basic input validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user + empty cart (using nested write)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        Cart: { create: {} },
      },
      include: { Cart: true },
    });

    res
      .status(201)
      .json({ message: "User created", userId: user.id, cartId: user.Cart.id });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Failed to create user." });
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

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    // Removed localStorage setting for a clean backend file
    // console.log("token ji" + token);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to login." });
  }
});

// -----------------------------------------------------
// 2. UNSECURED CART ROUTES (MODIFIED)
// -----------------------------------------------------

// ✅ Add product to cart (Authentication REMOVED)
router.post("/cart", async (req, res) => {
  // ⚠️ UNSECURED: userId is now taken directly from the request body
  const { userId, product } = req.body;

  if (!userId || !product) {
    return res.status(400).json({ error: "Missing userId or product object" });
  }

  try {
    // 1. Fetch the cart
    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      return res
        .status(404)
        .json({ error: "Cart not found for this user. Integrity error." });
    }

    // IMPORTANT: When working with Prisma's Json field, you need to cast the
    // retrieved field back to an array for modification.
    const currentProducts = Array.isArray(cart.products) ? cart.products : [];
    const updatedProducts = [...currentProducts, product];

    // 2. Update the cart
    const updatedCart = await prisma.cart.update({
      where: { userId },
      data: { products: updatedProducts },
    });

    res.json(updatedCart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
});

// ✅ Get cart (Authentication REMOVED)
// Now only requires userId in the URL params
router.get("/cart/:userId", async (req, res) => {
  // ⚠️ UNSECURED: userId is taken directly from the URL parameter
  const userId = req.params.userId; // Corrected from req.params()
  console.log(userId);
  try {
    let cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (err) {
    console.error("Fetch cart error:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// 🌟 Remove product from cart (Authentication REMOVED)
// Un-commented and modified for un-secured operation
router.delete("/cart/:userId/:productId", async (req, res) => {
  // ⚠️ UNSECURED: userId and productId are taken directly from the URL parameters
  const { userId, productId } = req.params;

  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing user or product ID." });
  }

  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    const currentProducts = Array.isArray(cart.products) ? cart.products : [];

    // Filter the array to remove the product with the given ID
    const updatedProducts = currentProducts.filter(
      (p) => p.id !== productId // Assuming the product object has an 'id' key
    );

    // Update the cart
    const updatedCart = await prisma.cart.update({
      where: { userId },
      data: { products: updatedProducts },
    });

    res.json({ message: `Product ${productId} removed.`, cart: updatedCart });
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
});

export default router;
