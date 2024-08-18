"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
    try {
        connectToDatabase();
        const { author, question, content, path } = params;
        const newAnswer = new Answer({
            content,
            author,
            question,
        });

        // Add the answer to the question answers array
        await Question.findByIdAndUpdate(question, {
            $push: { answers: newAnswer._id },
        });

        // TODO: ADD interaction.
        revalidatePath(path);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
