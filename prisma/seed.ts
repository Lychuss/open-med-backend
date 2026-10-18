import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

export const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });

await prisma.user.update({
  where: {
    id: "XkZZmyEjxQRZmMNhW8R8msoChA8P9dp7"
  },
  data: {
    role: "ADMIN"
  }
})