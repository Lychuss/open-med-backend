import { prisma } from "../../lib/prisma.ts";
import type { DoctorApplicationBody } from "../models/doctor-application.model.ts";

export const findDoctors = async (expertiseTitle: string) => {

    if(expertiseTitle == "all"){
        return await prisma.doctorsApplication.findMany({
            where: {
                status: "APPROVED"
            }, 
            include: {
                user: true,
                expertise: true
            }
        })
    }

    return await prisma.doctorsApplication.findMany({
        where: {
            expertise: {
                some: {
                    name: expertiseTitle
                }
            },
            status: "APPROVED"
        },
        include: {
            user: true,
            expertise: true
        }
    })
}

export const addPendingDoctor = async (data: DoctorApplicationBody, userId: string) => {

    return await prisma.doctorsApplication.create({
        data: {
            userId: userId,
            licenseExpiry: data.licenseExpiry,
            licenseNumber: data.licenseNumber,
            hospital: data.hospital,
            school: data.school,
            expertise: {
                connect: data.expertise.map((name) => ({name}))
            }
        }
    })
}