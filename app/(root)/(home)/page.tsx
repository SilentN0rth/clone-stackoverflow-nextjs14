import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
    return (
        <div className="flex flex-col gap-11">
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Questions</h1>
                <Link href={"/ask-question"} className="flex justify-end">
                    <Button className="primary-gradient px-4 py-3 text-light-900">Ask a Question</Button>
                </Link>
            </div>
            <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
                LocalSearchbar
                {/*  */}
                Filters
            </div>
        </div>
    );
};

export default Home;
