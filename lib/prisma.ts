import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const isTest = process.env.NODE_TEST === "test";
const connectionString = isTest ? process.env.DATABASE_TEST_URL : process.env.DATABASE_URL

if(!connectionString){
    throw new Error(isTest ? "DATABASE_URL_TEST is not set" : "DATABASE_URL is not set");
}

export const adapter = new PrismaPg({ connectionString: connectionString });
export const prisma = new PrismaClient({ adapter });