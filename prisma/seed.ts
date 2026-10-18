import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

export const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });

await prisma.expertise.createMany({
  data: [
    { id: "exp_cardiology", name: "Cardiology", description: "Heart and blood vessel conditions" },
    { id: "exp_dermatology", name: "Dermatology", description: "Skin, hair, and nail conditions" },
    { id: "exp_pediatrics", name: "Pediatrics", description: "Medical care for infants, children, and adolescents" },
    { id: "exp_neurology", name: "Neurology", description: "Brain, spinal cord, and nervous system disorders" },
    { id: "exp_psychiatry", name: "Psychiatry", description: "Mental health and behavioral disorders" },
  ],
  skipDuplicates: true,
});