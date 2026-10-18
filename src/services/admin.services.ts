import { prisma } from "../../lib/prisma.ts"

export const acceptingDoctors = async (applicationId: string, adminId: string) => {

    const isItAdmin = await prisma.user.findUnique({
        where: {
            id: adminId,
            role: "ADMIN"
        }
    })

    if(!isItAdmin) return;

    return await prisma.doctorsApplication.update({
        where: {
            id: applicationId,
            status: "PENDING"
        },
        data: {
            status: "APPROVED"
        }
    })
}

export const rejectedDoctors = async (applicationId: string, adminId: string) => {
    const isItAdmin = await prisma.user.findUnique({
        where: {
            id: adminId,
            role: "ADMIN"
        }
    })

    if(!isItAdmin) return;
    return await prisma.doctorsApplication.update({
        where: {
            id: applicationId,
            status: "PENDING"
        },
        data: {
            status: "REJECTED"
        }
    })
}

