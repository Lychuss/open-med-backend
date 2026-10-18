import type { Request, Response } from "express";

//Service
import { acceptingDoctors, rejectedDoctors } from "../services/admin.services.ts";

export const approvedDoctorController = async (req: Request, res: Response) => {
    const adminId = req.user?.id;
    const { applicationId } = req.params;

    if(!applicationId || typeof applicationId !== "string" || !adminId){
        return res.status(402).json({ message: "User did not send the needed requirements", success: false})
    }

    try {

        const isItAccepted = await acceptingDoctors(applicationId, adminId);

        if(!isItAccepted){
            return res.status(401).json({ message: "Invalid request! You are not an admin", success: false})
        }


        return res.status(202).json({ message: "Congrats user! Your request has been fully approved!", success: true })

    } catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error at accepting doctors!", success: false})
    }
}

export const rejectedDoctorController = async (req: Request, res: Response) => {
    const adminId = req.user?.id;
    const { applicationId } = req.params;

    if(!applicationId || typeof applicationId !== "string" || !adminId){
        return res.status(402).json({ message: "User did not send the needed requirements", success: false})
    }

    try {

        await rejectedDoctors(applicationId, adminId);

        return res.status(200).json({ message: "Unfornately we have to decline your request as it did not qualify for the requirements.", success: true })

    } catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error at accepting doctors!", success: false})
    }

}