import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import type { Request, Response } from "express";


dotenv.config();

export const app = express();


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "Server is running!"})
})


