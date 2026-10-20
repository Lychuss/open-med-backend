import { prisma } from "../../lib/prisma.ts"

export const acceptingDoctors = async (applicationId: string, adminId: string) => {

    const isItAdmin = await prisma.user.findUniqueOrThrow({
        where: {
            id: adminId,
            role: "ADMIN"
        }
    })

    console.log(isItAdmin);

    if(isItAdmin.role !== "ADMIN") return;

    return await prisma.doctorsApplication.update({
        where: {
            userId: applicationId,
            status: "PENDING"
        },
        data: {
            status: "APPROVED"
        }
    }).then( async () => await prisma.user.update({
        where: {
            id: applicationId
        },
        data: {
            role: "DOCTOR"
        }
    }))
}

export const rejectedDoctors = async (applicationId: string, adminId: string) => {
    const isItAdmin = await prisma.user.findUniqueOrThrow({
        where: {
            id: adminId,
            role: "ADMIN"
        }
    })

    if(isItAdmin.role !== "ADMIN") return;

    return await prisma.doctorsApplication.update({
        where: {
            userId: applicationId,
            status: "PENDING"
        },
        data: {
            status: "REJECTED"
        }
    })
}

