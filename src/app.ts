import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//Router
import usersRouter from "./routers/users.routes.ts";
import adminRouter from "./routers/admin.routes.ts";

import { auth } from "../lib/better-auth.ts";
import { toNodeHandler } from "better-auth/node";

import type { Request, Response } from "express";

dotenv.config({ quiet: true });

export const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.set("trust proxy", 1);

app.use("/open-medical", usersRouter, adminRouter);

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "Server is running!"})
})


