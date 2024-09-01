import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";
import { PAGE_SETTINGS } from "@/constants";
interface Props extends SearchParamsProps {
    userId: string;
    clerkId?: string | undefined | null;
}
const AnswersTab = async ({ userId, clerkId, searchParams }: Props) => {
    const result = await getUserAnswers({ userId, page: searchParams.page ? +searchParams.page : 1 });
    return (
        <>
            {result.answers.map((answer) => (
                <AnswerCard
                    key={answer._id}
                    _id={answer._id}
                    clerkId={clerkId}
                    question={answer.question}
                    author={answer.author}
                    upvotes={answer.upvotes.length}
                    createdAt={answer.createdAt}
                />
            ))}
            <div className="mt-11">
                <Pagination
                    pageNumber={searchParams.page ? +searchParams.page : PAGE_SETTINGS.page}
                    isNext={result.isNextAnswers}
                />
            </div>
        </>
    );
};

export default AnswersTab;
