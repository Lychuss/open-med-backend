import type { Request, Response } from "express"


export const getDoctors = (res: Response, req: Request) => {
    const { expertiseTitle } = req?.params;

    try {
        
    } catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error!", success: false });
    }
}