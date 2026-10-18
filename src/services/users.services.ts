import { prisma } from "../../lib/prisma.ts";
import type { DoctorApplicationBody } from "../models/doctor-application.model.ts";

export const usersDoctors = async (expertiseTitle: string) => {
    return prisma.doctors.findMany({
        where: {
            expertise: {
                some: {
                    name: expertiseTitle
                }
            }
        }
    })
}

export const addPendingDoctor = async (data: DoctorApplicationBody) => {
    return await prisma.doctorApplication.create({
        data: data
    })
}