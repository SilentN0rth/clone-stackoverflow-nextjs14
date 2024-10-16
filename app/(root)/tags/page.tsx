import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { PAGE_SETTINGS } from "@/constants";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";

import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "All tags | Dev Overflow",
};

const page = async ({ searchParams }: SearchParamsProps) => {
    const result = await getAllTags({
        searchQuery: searchParams.q,
        filter: searchParams.filter,
        page: searchParams.page ? +searchParams.page : 1,
    });
    return (
        <div className="grid gap-11">
            <h1 className="h1-bold text-dark100_light900">All Tags </h1>
            <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    route="/tags"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for tags"
                    otherClasess="flex-1"
                />
                <Filter filters={TagFilters} otherClasses="min-h-[56px] sm:min-w-[170px" />
            </div>
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {result.tags.length > 0 ? (
                    result.tags.map((tag) => <TagCard tag={tag} key={tag._id} />)
                ) : (
                    <NoResult
                        title="No tags Found"
                        description="It looks like there are no tags found."
                        link="/ask-question"
                        linkTitle="Ask a question"
                    />
                )}
            </section>
            <Pagination
                pageNumber={searchParams.page ? +searchParams.page : PAGE_SETTINGS.page}
                isNext={result.isNext}
            />
        </div>
    );
};

export default page;
