import type { Request, Response } from "express"
import { doctorApplicationBody } from "../models/doctor-application.model.ts";

//Services
import { addPendingDoctor } from "../services/users.services.ts";

export const doctorsApplication = async (req: Request, res: Response) => {
    const data = doctorApplicationBody.safeParse(req.body);

    if(!data.success){
        return res.status(404).json({ message: "User client did not send all the needed requirements!", success: false });
    }

    try {
        
        await addPendingDoctor(data.data);

        return res.status(200).json({ 
            message: "Your application is currently sent! Wait for further instructions while its pending.", 
            success: true 
        });

    } catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error!", success: false });
    }
}