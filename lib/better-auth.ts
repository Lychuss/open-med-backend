import dotenv from "dotenv";
dotenv.config();

import { betterAuth } from 'better-auth';
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma/seed.ts";

export const auth = betterAuth({
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
        },
        ipAddress: {
            ipAddressHeaders: ['x-fowarded-for']
        }
    },
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: ["http://localhost:3000", "https://cleanquest-frontend.vercel.app", `${process.env.VERCEL_BASE_URL}`],
    database: prismaAdapter(prisma, {provider: "postgresql"}),
    emailAndPassword: {
            enabled: true,
            autoSignIn: true
        },
    socialProviders: {
            google: 
                {
                    clientId: process.env.GOOGLE_CLIENT_ID!,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
                }
        },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"],
        }
    },
    // rateLimit: {
    //     window: 60,
    //     enabled: true,
    //     max: 100,
    //     storage: 'database',
    //     customRules: {
    //         "/sign-in/email": { window: 60, max: 5},
    //         "/sign-in/google": { window: 60, max: 5},
    //         "/sign-up/email": { window: 60, max: 5}
    //     }
    // },
    user: {
        additionalFields: {
            age: { type: "number", required: true },
            role: { type: "string", defaultValue: "PATIENT", input: false},
            city: { type: "string", required: true},
            sex: { type: "string", required: true },
        }
    }
});
