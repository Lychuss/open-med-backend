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
    const password = "test";

    await auth.api.signUpEmail({
        body: {
            name: name,
            email: email,
            password: "test",
            age: 38,
            city: "Cebu City",
            sex: "MALE"
        }
    })

    const user: LoginData = await prisma.user.findUniqueOrThrow({ where: { email: email }})

    const data: CreateUser = {
        user: user,
        email: email,
        password: password
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