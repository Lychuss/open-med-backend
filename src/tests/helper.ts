import { prisma } from "../../lib/prisma.ts";
import { auth } from "../../lib/better-auth.ts";
import request from "supertest"
import { app } from "../app.ts";

import type { LoginData, CreateUser } from "./types/authentication.types.ts";

let counter: number = 0;

export const createUser = async ():Promise<CreateUser> => {
    counter += 1;
    const name = `user${counter}`;
    const email = `user${counter}@gmail.com`
    const password = "test1234";

    await auth.api.signUpEmail({
        body: {
            name: name,
            email: email,
            password: password,
            age: 38,
            city: "Cebu City",
            sex: "MALE"
        }
    })

    const user: LoginData = await prisma.user.findUniqueOrThrow({ where: { email: email }});

    const data: CreateUser = {
        user: user,
        email: email,
        password: password,
        role: user.role
    }

    return data;
}

export const loginUser = async (email: string, password: string) => {

    const res = await request(app)
        .post("/api/auth/sign-in/email")
        .send({
            email: email,
            password: password
        })

    const cookies = res.headers["set-cookie"];
    if (!cookies) throw new Error("Cookie is not set!")
    return cookies;
}

export async function resetAndSeedTest() {

    if (process.env.NODE_TEST !== "test") {
        throw new Error("Refusing to reset: NODE_TEST is not 'test'");
    }

    await prisma.doctorsApplication.deleteMany();
    await prisma.patients.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verification.deleteMany();
    await prisma.rateLimit.deleteMany();
    await prisma.user.deleteMany();

    await prisma.expertise.createMany({
        data: [
            { id: "exp_cardiology", name: "Cardiology" },
            { id: "exp_dermatology", name: "Dermatology" },
            { id: "exp_pediatrics", name: "Pediatrics"  },
        ],
        skipDuplicates: true,
    });
}
