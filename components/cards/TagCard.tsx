import Link from "next/link";
import React from "react";
export interface Props {
    tag: {
        _id: string;
        name: string;
        questions: [];
    };
}
const TagCard = ({ tag }: Props) => {


    return (
        <article className="background-light900_dark200 light-border shadow-light100_darknone relative flex flex-col justify-center gap-3.5 rounded-2xl border px-8 py-10">
            <Link href={`/tags/${tag._id}`} className="absolute inset-0" />
            <p className="background-light800_dark400 paragraph-semibold text-dark300_light900 w-fit rounded-lg p-2 px-6">
                {tag.name}
            </p>
            <p className="small-regular text-dark500_light700">
                JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of
                the World Wide Web, alongside HTML and CSS
            </p>
            <p className="small-medium text-dark400_light500">
                <span className="body-semibold primary-text-gradient mr-2.5">{tag.questions.length}+</span>Questions
            </p>
        </article>
    );
};

export default TagCard;
