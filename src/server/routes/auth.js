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
    // 🟢 Find the unique Cart by userId or create one if it doesn't exist
    const userCart = await prisma.Cart.upsert({
      where: {
        userId: userId,
      },
      update: {},
      create: {
        // Define the data to create a new Cart
        userId: userId,
        // Add any other required fields for a new Cart here
      },
      // The 'include' block must be *outside* 'update' and 'create'
      // to include relations in the final result.
      include: {
        items: {
          // Include the related Product data for each item
          include: {
            product: true,
          },
          // Order items by creation date or name (optional)
          orderBy: {
            // Example: orderBy: { createdAt: 'asc' }
          },
        },
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
  // Assuming the request body contains the user ID, product ID, and optional quantity
  const { userId, productId, quantity } = req.body;

  // Basic input validation
  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing userId or productId." });
  }

  try {
    // Call the combined upsert function
    const cartItem = await addProductToCart(userId, productId, quantity);

    // Return the created/updated cart item and a success status
    res.status(200).json({
      message: "Product quantity updated in cart.",
      item: cartItem,
    });
  } catch (err) {
    // Handle specific errors from the function
    console.error("Failed to process cart request:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
});
async function addProductToCart(userId, productId, quantity = 1) {
  // 1. Find or Create the User's Cart
  const cart = await upsertCart(userId);

  // 2. Define the Unique Identifier for the CartItem
  //    This uses the unique constraint @@unique([cartId, productId]) defined on your model.
  const itemIdentifier = {
    cartId_productId: {
      cartId: cart.id,
      productId: productId,
    },
  };

  try {
    // 3. Upsert the CartItem:
    //    - If the CartItem exists (same cart, same product), update the quantity.
    //    - If the CartItem doesn't exist, create a new one.
    const updatedCartItem = await prisma.CartItem.upsert({
      where: itemIdentifier,
      update: {
        // 🟢 UPDATE LOGIC: If the item exists, increment its quantity.
        quantity: {
          increment: quantity,
        },
      },
      create: {
        // 🟢 CREATE LOGIC: If the item is new, set the quantity.
        cartId: cart.id,
        productId: productId,
        quantity: quantity,
      },
      // Include the related product data in the response
      include: {
        product: true,
      },
    });

    return updatedCartItem;
  } catch (error) {
    // This often catches errors if the productId doesn't exist in the Product table.
    console.error("Error during CartItem upsert:", error);
    throw new Error("Could not add product to cart. Check if product exists.");
  }
}
// Assumes prisma client is initialized: const prisma = new PrismaClient();

async function upsertCart(userId) {
  return prisma.Cart.upsert({
    where: { userId: userId },
    update: {}, // No updates needed if it exists, just return it
    create: { userId: userId }, // Create a new cart if not found
  });
}
export default router;
