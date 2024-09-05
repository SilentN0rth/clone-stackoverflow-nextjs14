import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { PAGE_SETTINGS } from "@/constants";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

const page = async ({ searchParams }: SearchParamsProps) => {
    const result = await getAllUsers({
        searchQuery: searchParams.q,
        filter: searchParams.filter,
        page: searchParams.page ? +searchParams.page : 1,
    });

    return (
        <div className="grid gap-11">
            <h1 className="h1-bold text-dark100_light900">All Questions</h1>
            <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    route="/community"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for amazing minds"
                    otherClasess="flex-1"
                />
                <Filter filters={UserFilters} otherClasses="min-h-[56px] sm:min-w-[170px" />
            </div>
            <section className="flex flex-wrap gap-4">
                {result.users.length > 0 ? (
                    result.users.map((user) => <UserCard user={user} key={user._id} />)
                ) : (
                    <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                        <p>No users yet</p>
                        <Link href="/sign-up" className="mt-2  font-bold text-accent-blue">
                            Join to be the first!
                        </Link>
                    </div>
                )}
            </section>
            <Pagination
                pageNumber={searchParams?.page ? +searchParams.page : PAGE_SETTINGS.page}
                isNext={result.isNext}
            />
        </div>
    );
};

export default page;
