import TagCard from "@/components/cards/TagCard";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
const page = async () => {
    const result = await getAllTags({});
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
                <Filters filters={TagFilters} otherClasses="min-h-[56px] sm:min-w-[170px" />
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
        </div>
    );
};

export default page;
