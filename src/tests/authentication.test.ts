import { prisma } from "../../lib/prisma.ts";
import { app } from "../app.ts";
import request from "supertest";
import { resetAndSeedTest } from "./seed.ts"; // your pool file

beforeAll( async () => {
    await resetAndSeedTest();
})

afterEach( async () => {
    await prisma.$disconnect();
})

describe("test if user is created and instantly become a patient first", () => {
    test("check first if user is created", async () => {
        const req = await request(app)
            .post("/api/auth/sign-up/email")
    })
})