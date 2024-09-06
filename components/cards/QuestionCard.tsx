import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import { EditDeleteAction } from "../shared/EditDeleteAction";
export interface QuestionProps {
    _id: string;
    title: string;
    tags: {
        _id: string;
        name: string;
    }[];
    author: {
        _id: string;
        clerkId: string;
        name: string;
        picture: string;
    };
    upvotes: number[];
    views: number;
    answers: {}[];
    createdAt: Date;
    clerkId?: string | null | undefined;
}
const QuestionCard = ({ _id, title, clerkId, tags, author, upvotes, views, answers, createdAt }: QuestionProps) => {
    const showActionButtons = clerkId && clerkId === author.clerkId;
    return (
        <div className="card-wrapper rounded-lg p-9 sm:px-11">
            <div className={`grid grid-cols-[1fr,auto] items-start justify-between gap-x-5`}>
                <div className="word-break">
                    <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
                        {getTimestamp(createdAt)}
                    </span>
                    <Link href={`/question/${_id}`}>
                        <h3 className="sm:h3-semibold base-semibold text-dark200_light900  line-clamp-3 flex-1 lg:line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                </div>

                <SignedIn>{showActionButtons && <EditDeleteAction type="Question" itemId={_id} />}</SignedIn>

                <div className="col-span-2 mt-3.5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <RenderTag key={tag._id} name={tag.name} _id={tag._id} />
                    ))}
                </div>
                <div className={`flex-between col-span-2 mt-6 w-full flex-wrap gap-3 `}>
                    <Metric
                        imgUrl={author.picture}
                        alt=""
                        value={author.name}
                        title={` - asked ${getTimestamp(createdAt)}`}
                        href={`/profile/${author._id}`}
                        isAuthor={true}
                        textStyles="body-medium text-dark400_light700"
                    />
                    <div className="flex gap-3">
                        <Metric
                            imgUrl="/assets/icons/like.svg"
                            alt=""
                            value={formatNumber(upvotes.length)}
                            title=" Votes"
                            textStyles="small-medium text-dark400_light800"
                        />
                        <Metric
                            imgUrl="/assets/icons/message.svg"
                            alt=""
                            value={formatNumber(answers.length)}
                            title=" Answers"
                            textStyles="small-medium text-dark400_light800"
                        />
                        <Metric
                            imgUrl="/assets/icons/eye.svg"
                            alt=""
                            value={formatNumber(views)}
                            title=" Views"
                            textStyles="small-medium text-dark400_light800"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
