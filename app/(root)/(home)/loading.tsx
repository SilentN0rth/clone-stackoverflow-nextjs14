import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
const Loading = () => {
    return (
        <section>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Questions</h1>
                <Link href={"/ask-question"} className="flex justify-end">
                    <Button className="primary-gradient px-4 py-3 text-light-900">Ask a Question</Button>
                </Link>
            </div>
            <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
                <Skeleton className="h-14 flex-1" />
                <div className="hidden max-md:block">
                    <Skeleton className="h-14 w-28" />
                </div>
            </div>
            <div className="my-10 grid grid-cols-2 gap-6 xs:grid-cols-3 sm:grid-cols-4 lg:flex lg:flex-wrap">
                <Skeleton className="h-9 w-full lg:max-w-36" />
                <Skeleton className="h-9 w-full lg:max-w-36" />
                <Skeleton className="h-9 w-full lg:max-w-36" />
                <Skeleton className="h-9 w-full xs:col-span-full sm:col-span-1 lg:max-w-36" />
                <div className="col-span-full flex w-full flex-col gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <Skeleton key={item} className="h-48 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Loading;
