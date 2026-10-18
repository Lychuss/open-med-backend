import z from "zod";

export const expertiseModel = z.object({
    name: z.string()
})

export type ExpertiseModel = z.infer<typeof expertiseModel>;