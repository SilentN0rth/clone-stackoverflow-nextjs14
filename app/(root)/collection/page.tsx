import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import React from "react";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import NoResult from "@/components/shared/NoResult";
import QuestionCard, { QuestionProps } from "@/components/cards/QuestionCard";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { PAGE_SETTINGS } from "@/constants";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Collections | Dev Overflow",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
    const { userId } = auth();
    if (!userId) return null;
    const result = await getSavedQuestions({
        clerkId: userId,
        searchQuery: searchParams.q,
        filter: searchParams.filter,
        page: searchParams.page ? +searchParams.page : 1,
    });
    return (
        <div className="flex flex-col gap-11">
            <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
            <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    route={`/collection`}
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for Questions"
                    otherClasess="flex-1"
                />
                {/*  */}
                <Filter filters={QuestionFilters} otherClasses="min-h-[56px] sm:min-w-[170px" />
            </div>
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
                        title={"There's no question saved to show"}
                        description={
                            "Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                        }
                        link="/ask-question"
                        linkTitle="Ask a Question"
                    />
                )}
            </div>
            <Pagination
                pageNumber={searchParams?.page ? +searchParams.page : PAGE_SETTINGS.page}
                isNext={result.isNext}
            />
        </div>
    );
};

export default Page;
