import { prisma } from "../../lib/prisma";

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