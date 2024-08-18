import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface Props {
    params: { id: string };
    searchParams: string;
}

const Page = async ({ params, searchParams }: Props) => {
    const result = await getQuestionById({ questionId: params.id });
    return (
        <>
            <div className="flex-start flex-col">
                <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                    <Link href={`/profile/${result.author.clerkId}`} className="flex items-center gap-1">
                        <Image
                            src={result.author.picture}
                            width={22}
                            height={22}
                            alt={`${result.author.name} profile picture`}
                            className="rounded-full"
                        />
                        <p className="paragraph-semibold text-dark300_light700">{result.author.name}</p>
                    </Link>
                    <div className="flex justify-end">{/* VOTING */}</div>
                </div>
                <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">{result.title}</h2>
            </div>

            <div className="mb-8 mt-5 flex flex-wrap gap-4">
                <Metric
                    imgUrl="/assets/icons/clock.svg"
                    alt=""
                    value={` asked ${getTimestamp(result.createdAt)}`}
                    title=" Asked"
                    textStyles="small-medium text-dark400_light800"
                />
                <Metric
                    imgUrl="/assets/icons/message.svg"
                    alt=""
                    value={formatNumber(result.answers.length)}
                    title=" Answers"
                    textStyles="small-medium text-dark400_light800"
                />
                <Metric
                    imgUrl="/assets/icons/eye.svg"
                    alt=""
                    value={formatNumber(result.views)}
                    title=" Views"
                    textStyles="small-medium text-dark400_light800"
                />
            </div>
            <ParseHTML data={result.content} />
            <div className="mt-8 flex flex-wrap gap-3">
                {result.tags.map((tag: any) => (
                    <RenderTag key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
                ))}
            </div>
        </>
    );
};

export default Page;
