import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";
import { getQuestions, getRecommendedQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { PAGE_SETTINGS } from "@/constants";
import { auth } from "@clerk/nextjs/server";

import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Home | Dev Overflow",
};
const Home = async ({ searchParams }: SearchParamsProps) => {
    const { userId } = auth();
    let result;

    if (searchParams?.filter === "recommended") {
        if (userId) {
            result = await getRecommendedQuestions({
                userId,
                searchQuery: searchParams.q,
                page: searchParams.page ? +searchParams.page : 1,
            });
        } else {
            result = {
                questions: [],
                isNext: false,
            };
        }
    } else {
        result = await getQuestions({
            searchQuery: searchParams.q,
            filter: searchParams.filter,
            page: searchParams.page ? +searchParams.page : 1,
        });
    }

    return (
        <div className="flex flex-col gap-11">
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Questions</h1>
                <Link href={"/ask-question"} className="flex justify-end">
                    <Button className="primary-gradient px-4 py-3 text-light-900">Ask a Question</Button>
                </Link>
            </div>
            <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    route="/"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for Questions"
                    otherClasess="flex-1"
                />
                {/*  */}
                <Filter
                    filters={HomePageFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px"
                    containerClasses="hidden max-md:flex"
                />
            </div>
            <HomeFilters />
            <div className="flex flex-col gap-6">
                {result.questions.length > 0 ? (
                    result.questions.map((question) => (
                        <QuestionCard
                            key={question._id as string}
                            _id={question._id as string}
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
                        title={"There's no question to show"}
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

export default Home;
