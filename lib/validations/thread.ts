import * as z from "zod"

export const ThreadValidation = z.object({
    thread: z.string().min(1,{message: "Minimum 1 charcters"}).max(280,{message: "Maximum 280 charcters"}),
    accountId: z.string(),
})

export const CommentValidation = z.object({
    thread: z.string().min(1,{message: "Minimum 1 charcters"}).max(280,{message: "Maximum 280 charcters"}),
})