import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const seriesSchema = z.object({
    id: z.number(),
    title: z.string(),
    alternative_title: z.string(),
    studio: z.string(),
    type: z.string()
})

export type Series = z.infer<typeof seriesSchema>
