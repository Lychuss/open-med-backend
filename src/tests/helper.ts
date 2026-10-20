import { prisma } from "../../lib/prisma.ts";
import { auth } from "../../lib/better-auth.ts";
import request from "supertest"
import { app } from "../app.ts";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

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

export async function getUser(email: string){
    const role = await prisma.user.findUniqueOrThrow({
        where: {
            email: email
        },
        select: {
            role: true,
            id: true
        }
    })

    const status = await prisma.doctorsApplication.findUniqueOrThrow({
        where: {
            userId: role.id
        },
        select: {
            status: true
        }
    })

    console.log(role.role, status.status);

    if(role.role === "DOCTOR" && status.status === "APPROVED"){
        return true;
    }

    return role.id;
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

    await auth.api.signUpEmail({
        body: {
            name: "ADMIN USER",
            email: process.env.ADMIN_EMAIL!,
            password: process.env.ADMIN_PASSWORD!,
            age: 38,
            city: "Cebu City",
            sex: "MALE"
        }
    })

    await auth.api.signUpEmail({
        body: {
            name: "test1",
            email: "test1@gmail.com",
            password: "test1234",
            age: 38,
            city: "Cebu City",
            sex: "MALE"
        }
    })

    await auth.api.signUpEmail({
        body: {
            name: "test2",
            email: "test2@gmail.com",
            password: "test1234",
            age: 21,
            city: "Lucena City",
            sex: "FEMALE"
        }
    })

    await prisma.user.update({
        where: {
            email: process.env.ADMIN_EMAIL!
        },
        data: {
            role: "ADMIN"
        }
    }).then( async () => {

        const userId = await prisma.user.findUniqueOrThrow({
            where: {
                email: "test1@gmail.com"
            },
            select: {
                id: true
            }
        })
        console.log(userId.id);
        await prisma.doctorsApplication.create({
            data: {
                userId: userId.id,
                licenseExpiry: new Date("2028-12-31"),
                licenseNumber: "66061",
                school: "Enverga",
                hospital: "Quezon Medical Center",
                expertise: {
                    connect: [{ id: "exp_cardiology" }, { id: "exp_dermatology" }, { id: "exp_pediatrics" }]
                }
            }
        })
    })
}
