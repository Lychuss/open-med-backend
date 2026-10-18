import { prisma } from "../../lib/prisma.ts"

export const acceptingDoctors = async (applicationId: string) => {
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

export const rejectedDoctors = async (applicationId: string) => {
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

