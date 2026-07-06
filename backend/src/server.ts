import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { prisma } from "../lib/prisma";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ DB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB Error", err);
    process.exit(1);
  }
}

startServer();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});