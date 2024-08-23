"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { downvoteQuestion, upvoteQuestion } from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
interface Props {
    type: string;
    itemId: string;
    userId: string;
    upvotes: number;
    hasupVoted: boolean;
    downvotes: number;
    hasdownVoted: boolean;
    hasSaved?: boolean;
}

const Votes = ({ type, itemId, userId, upvotes, hasupVoted, downvotes, hasdownVoted, hasSaved }: Props) => {
    const path = usePathname();
    const handleSave = async () => {
        await toggleSaveQuestion({ userId: JSON.parse(userId), questionId: JSON.parse(itemId), path, hasSaved });
    };
    const handleVote = async (action: string) => {
        if (!userId) return;
        if (action === "upvote") {
            if (type === "question") {
                await upvoteQuestion({
                    questionId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path,
                });
            } else if (type === "answer") {
                await upvoteAnswer({
                    answerId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path,
                });
            }
        }
        if (action === "downvote") {
            if (type === "question") {
                await downvoteQuestion({
                    questionId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path,
                });
            } else if (type === "answer") {
                await downvoteAnswer({
                    answerId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path,
                });
            }
        }
        // todo: show a toast
    };
    return (
        <div className="flex gap-5 ">
            <div className="flex-center gap-2.5">
                {/* Upvote */}
                <div className="flex-center gap-1.5">
                    <Image
                        src={hasupVoted ? "/assets/icons/upvoted.svg" : "/assets/icons/upvote.svg"}
                        width={18}
                        height={18}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => handleVote("upvote")}
                    />
                    <div className="flex-center background-light700_dark400 rounded-sm p-1">
                        <p className="subtle-medium text-dark400_light900">{formatNumber(upvotes)}</p>
                    </div>
                </div>
                {/* Downvote */}
                <div className="flex-center gap-1.5">
                    <Image
                        src={hasdownVoted ? "/assets/icons/downvoted.svg" : "/assets/icons/downvote.svg"}
                        width={18}
                        height={18}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => handleVote("downvote")}
                    />
                    <div className="flex-center background-light700_dark400 rounded-sm p-1">
                        <p className="subtle-medium text-dark400_light900">{formatNumber(downvotes)}</p>
                    </div>
                </div>
            </div>
            {type === "question" && (
                <Image
                    src={hasSaved ? "/assets/icons/star-filled.svg" : "/assets/icons/star-red.svg"}
                    width={18}
                    height={18}
                    alt=""
                    className="cursor-pointer"
                    onClick={handleSave}
                />
            )}
        </div>
    );
};

export default Votes;
