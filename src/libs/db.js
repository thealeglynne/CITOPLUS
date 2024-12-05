import { PrismaClient } from "@prisma/client";

// Singleton pattern for Prisma client
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Global reference to Prisma instance
const globalForPrisma = globalThis;

// Check if Prisma instance already exists, if not, create it
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Save Prisma instance globally (only in development to avoid multiple connections during hot reloads)
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

// Close Prisma client gracefully when the application terminates (production)
if (process.env.NODE_ENV === "production") {
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}
