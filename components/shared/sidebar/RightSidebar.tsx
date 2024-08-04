import Link from "next/link";
import Image from "next/image";
import RenderTag from "../RenderTag";
const hotQuestions = [
    {
        _id: 1,
        title: "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    {
        _id: 2,
        title: "Is it only me or the font is bolder than necessary?",
    },
    {
        _id: 3,
        title: "Redux Toolkit Not Updating State as Expected",
    },
    {
        _id: 4,
        title: "Can I get the course for free?",
    },
    {
        _id: 5,
        title: "Async/Await Function Not Handling Errors Properly",
    },
];
const popularTags = [
    {
        _id: 1,
        name: "javascript",
        totalQuestions: 5,
    },
    {
        _id: 2,
        name: "react",
        totalQuestions: 4,
    },
    {
        _id: 3,
        name: "next",
        totalQuestions: 5,
    },
    {
        _id: 4,
        name: "vue",
        totalQuestions: 2,
    },
    {
        _id: 5,
        name: "redux",
        totalQuestions: 10,
    },
];
const RightSidebar = () => {
    return (
        <aside className="background-light900_dark200 global-padding light-border custom-scrollbar text-dark500_light700 sticky inset-y-0 right-0 flex max-h-screen flex-col gap-16 overflow-y-auto border-l pt-36 max-xl:hidden">
            <div className="grid gap-7">
                <h3 className="h3-bold text-dark200_light900 ">Top Questions</h3>
                {hotQuestions.map((question) => (
                    <Link
                        key={question._id}
                        className=" flex max-w-[270px] justify-between gap-7"
                        href={`/questions/${question._id}`}>
                        <p className="body-medium text-dark500_light700">{question.title}</p>
                        <Image
                            src={"/assets/icons/chevron-right.svg"}
                            alt=""
                            width={20}
                            height={20}
                            className="invert-colors"
                        />
                    </Link>
                ))}
            </div>
            <div className="flex flex-col gap-7">
                <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
                <div className="flex flex-col gap-4">
                    {popularTags.map((tag) => (
                        <RenderTag
                            key={tag._id}
                            _id={tag._id}
                            name={tag.name}
                            totalQuestions={tag.totalQuestions}
                            showCount
                        />
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;
