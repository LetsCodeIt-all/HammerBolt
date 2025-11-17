// auth.js
import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Rss } from "lucide-react";

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // use a real secret in prod

// ===============================
// 1️⃣  REGISTER USER
// ===============================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    // Optional: Create empty cart for new user
    await prisma.cart.create({
      data: {
        products: [],
        User: {
          connect: { id: user.id },
        },
      },
    });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===============================
// 2️⃣  LOGIN USER
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===============================
// 3️⃣  GET USER INFO (Protected Route)
// ===============================
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { Cart: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});
router.post("/cartItem", async (req, res) => {
  try {
    const { userId, Products } = req.body;

    // Check if the user's cart exists
    let cart = await prisma.cart.findUnique({
      where: { userId: userId },
    });

    if (!cart) {
      // Create a new cart for the user
      cart = await prisma.cart.create({
        data: {
          products: Products,
          user: {
            connect: { id: userId },
          },
        },
      });
    } else {
      // Update existing cart
      cart = await prisma.cart.update({
        where: { userId },
        data: {
          products: Products,
        },
      });
    }

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating cart" });
  }
});
export default router;
