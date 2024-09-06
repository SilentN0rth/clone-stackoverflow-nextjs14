import { z } from "zod";

export const QuestionsSchema = z.object({
    title: z.string().min(5).max(130),
    explanation: z.string().min(100),
    tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
    answer: z.string().min(100),
});

export const ProfileSchema = z.object({
    name: z.string().trim().min(5).max(50),
    username: z.string().trim().min(5).max(50),
    bio: z.string().trim().min(10).max(250),
    portfolioWebsite: z
        .string()
        .trim()
        .optional()
        .refine((val) => val === undefined || val.length === 0 || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val), {
            message: "Invalid URL format for website",
        }), //
    location: z
        .string()
        .trim()
        .optional()
        .refine((val) => val === undefined || val.length === 0 || (val.length >= 3 && val.length <= 50), {
            message: "Location must be between 3 and 50 characters long",
        }),
});
