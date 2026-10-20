import { prisma } from "../../lib/prisma.ts";
import { app } from "../app.ts";
import request from "supertest";
import { resetAndSeedTest, loginUser, createUser, getUser } from "./helper.ts";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

beforeEach(async () => {
    await resetAndSeedTest();
})

afterAll(async () => {
    await prisma.$disconnect();
})

describe("check if role admin only has the permission", () => {
    test("an admin user will be able to approved or reject an application", async () => {
        const cookie = await loginUser(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        expect(cookie).toBeDefined();

        const userId = await getUser("test1@gmail.com");

        const req = await request(app)
            .put(`/open-medical/admin/doctors/status/${userId}/approved`)
            .set("Cookie", cookie);
        
        expect(req.status).toBe(202);

        const user = await getUser("test1@gmail.com");

        expect(user).toBe(true);
        
    })
})