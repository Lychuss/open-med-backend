import type { Request, Response } from "express";

// Models
import { doctorApplicationBody } from "../models/doctor-application.model.ts";
import { expertiseModel } from "../models/expertise.models.ts";

//Services
import { addPendingDoctor, findDoctors } from "../services/users.services.ts";

export const doctorsApplication = async (req: Request, res: Response) => {
    const id = req.user?.id;
    const data = doctorApplicationBody.safeParse(req.body);

    console.log(id);
    console.log(data);

    if(!data.success || !id){
        return res.status(404).json({ message: "User client did not send all the needed requirements!", success: false });
    }

    try {
        
        await addPendingDoctor(data.data, id);

        return res.status(200).json({ 
            message: "Your application is currently sent! Wait for further instructions while its pending.", 
            success: true 
        });

    } catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error!", success: false });
    }
}

export const findExpertDoctors = async (req: Request, res: Response) => {
    const { expertiseName } = req.params;
    const data = expertiseModel.safeParse(expertiseName);

    if(!expertiseName || !data.success){
        return res.status(401).json({ message: "User didnt send the expert category!", success: false });
    }

    try {
        const doctors = await findDoctors(data.data.name);
        console.log(doctors);
        return res.status(200).json({ message: "Successfully retrieve all doctors", data: doctors, success: true });

    } catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error!", success: false })
    }
}