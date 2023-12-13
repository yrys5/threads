// import * as z from "zod"

// export const ThreadValidation = z.object({
//     thread: z.string().min(1,{message: "Minimum 1 charcters"}).max(280,{message: "Maximum 280 charcters"}),
//     accountId: z.string(),
// })

// export const CommentValidation = z.object({
//     thread: z.string().min(1,{message: "Minimum 1 charcters"}).max(280,{message: "Maximum 280 charcters"}),
// })

import * as z from "zod";

const maxWordLength = 32;

const threadSchema = z.string()
  .min(1, { message: "Minimum 1 character" })
  .max(280, { message: "Maximum 280 characters" })
  .refine((value) => {
    const words = value.split(/\s+/);
    return words.every(word => word.length <= maxWordLength);
  }, {
    message: `Note: Each single word can have a maximum of ${maxWordLength} characters`,
  });

export const ThreadValidation = z.object({
  thread: threadSchema,
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: threadSchema,
});