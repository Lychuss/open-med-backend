import z from "zod";

export const expertiseModel = z.object({
    name: z.array(z.string())
})

export type ExpertiseModel = z.infer<typeof expertiseModel>;