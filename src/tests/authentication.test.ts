import { prisma } from "../../lib/prisma.ts";
import { app } from "../app.ts";
import request from "supertest";
import { resetAndSeedTest } from "./helper.ts";
import { loginUser, createUser } from "./helper.ts";

beforeEach( async () => {
    await resetAndSeedTest();
})

afterAll( async () => {
    await prisma.$disconnect();
})

describe("test authentication", () => {
    test("check first if user is created", async () => {
        const signup = await createUser();
        expect(signup.role).toBe("PATIENT");

        const login = await loginUser(signup.email, signup.password);
        expect(login).toBeDefined();
    })
})

describe("test doctors application", () => {
    test("user must not to be allowed to get inside if not login", async () => {

        const req = await request(app)
            .post("/open-medical/users/doctor/doctor-applications/verify")
            .send({
                licenseNumber: "77656",
                licenseExpiry: "2028-12-31",
                school: "Southern Luzon State University",
                hospital: "Mount Carmel",
                expertise: [
                    "Cardiology",
                    "Dermatology",
                    "Pediatrics"
                ]
            }).set("Cookie", "asdwadsa");

            expect(req.status).toBe(401);
        
    })

    test("user must to be allowed to get inside if login", async () => {
        const signup = await createUser();

        const login = await loginUser(signup.email, signup.password);

        const req = await request(app)
            .post("/open-medical/users/doctor/doctor-applications/verify")
            .send({
                licenseNumber: "77656",
                licenseExpiry: "2028-12-31",
                school: "Southern Luzon State University",
                hospital: "Mount Carmel",
                expertise: [
                    "Cardiology",
                    "Dermatology",
                    "Pediatrics"
                ]
            }).set("Cookie", login);

            expect(req.status).toBe(201);
    })

    test("user must to be not allowed to get inside if lack of requirements", async () => {
        const signup = await createUser();

        const login = await loginUser(signup.email, signup.password);

        const req = await request(app)
            .post("/open-medical/users/doctor/doctor-applications/verify")
            .send({
                licenseNumber: "77653",
                licenseExpiry: "2028-12-31",
                hospital: "Mount Carmel",
                expertise: [
                    "Cardiology",
                    "Dermatology",
                    "Pediatrics"
                ]
            }).set("Cookie", login);

            expect(req.status).toBe(404);
    })
})