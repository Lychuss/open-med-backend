import type { Request, Response } from "express"

export const acceptDoctor = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if(!userId || typeof userId !== "string"){
        return res.status(402).json({ message: "User did not send the needed requirements", success: false})
    }

    try {

        

    } catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error at accepting doctors!", success: false})
    }
}