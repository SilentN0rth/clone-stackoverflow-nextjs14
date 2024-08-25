import { SearchParamsProps } from "@/types";
import React from "react";
interface Props extends SearchParamsProps {
    userId: string;
    clerkId?: string | undefined | null;
}
const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
    return <div>AnswersTab</div>;
};

export default AnswersTab;
