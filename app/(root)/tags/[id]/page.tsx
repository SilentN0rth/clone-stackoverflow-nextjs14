import QuestionCard, { QuestionProps } from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { PAGE_SETTINGS } from "@/constants";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import React from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
    title: `Tag | Dev Overflow`,
};

const Page = async ({ params, searchParams }: URLProps) => {
    const result = await getQuestionByTagId({
        tagId: params.id,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
    });
    return (
        <div className="flex flex-col gap-11">
            <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
            <LocalSearch
                route={`/tags/${params.id}`}
                iconPosition="left"
                imgSrc="/assets/icons/search.svg"
                placeholder="Search tag Questions"
                otherClasess="flex-1"
            />
            <div className="flex flex-col gap-6">
                {result.questions.length > 0 ? (
                    result.questions.map((question: QuestionProps) => (
                        <QuestionCard
                            key={question._id}
                            _id={question._id}
                            title={question.title}
                            tags={question.tags}
                            author={question.author}
                            upvotes={question.upvotes}
                            views={question.views}
                            answers={question.answers}
                            createdAt={question.createdAt}
                        />
                    ))
                ) : (
                    <NoResult
                        title={"There's no tag  question saved to show"}
                        description={
                            "Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                        }
                        link="/ask-question"
                        linkTitle="Ask a Question"
                    />
                )}
            </div>
            <Pagination
                pageNumber={searchParams.page ? +searchParams.page : PAGE_SETTINGS.page}
                isNext={result.isNext}
            />
        </div>
    );
};

export default Page;
