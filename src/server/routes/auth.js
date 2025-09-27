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
    const cart = await prisma.CartItem.findMany({ where: { userId } });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});
router.post("/cart", async (req, res) => {
  const { userId, productId, product } = req.body;

  try {
    const user = await prisma.CartItem.create({
      data: {
        userId,
        productId,
        product: {
          create: {
            name: product.title,
            price: product.price,
            imageUrl: product.images[2],
            quantity: product.quantity,
          },
        },
      },
    });
    res.status(201).json({
      message: "Item added",
      userId: user.id,
      productId: productId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
