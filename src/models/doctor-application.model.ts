import z from "zod";

export const doctorApplicationBody = z.object({
    licenseNumber:  z.string(),
    licenseExpiry: z.coerce.date(),
    school: z.string(),
    hospital: z.string(),
    expertise: z.array(z.string())
})

export type DoctorApplicationBody = z.infer<typeof doctorApplicationBody>;