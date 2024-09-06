import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Ask question | Dev Overflow",
};
const Page = async () => {
    const { userId } = auth();
    // const userId = "1234567890";
    if (!userId) redirect("/sign-in");
    const mongoUser = await getUserById({ userId });
    return (
        <div>
            <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
            <div className="mt-9">
                <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
            </div>
        </div>
    );
};

export default Page;
