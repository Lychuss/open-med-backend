import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import usersRouter from "./routers/users.routes";
import { auth } from "../lib/better-auth";
import { toNodeHandler } from "better-auth/node";

import type { Request, Response } from "express";


dotenv.config();

export const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use("/open-medical", usersRouter);

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "Server is running!"})
})


