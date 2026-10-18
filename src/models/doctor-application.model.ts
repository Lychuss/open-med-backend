import z from "zod";

export const doctorApplicationBody = z.object({
    userId: z.string(),
    licenseNumber:  z.string(),
    licenseExpiry: z.coerce.date(),
    school: z.string(),
    hospital: z.string()
})

export type DoctorApplicationBody = z.infer<typeof doctorApplicationBody>;