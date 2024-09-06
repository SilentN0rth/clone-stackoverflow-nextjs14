import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
interface Props {
    title: string;
    description: string;
    link: string;
    linkTitle: string;
}
const NoResult = ({ title, description, link, linkTitle }: Props) => {
    return (
        <div className="col-span-3 mt-10 flex flex-col items-center justify-center gap-6">
            <Image
                src={"/assets/images/light-illustration.png"}
                width={270}
                height={200}
                alt="No result illustration"
                className="block object-contain dark:hidden"
            />
            <Image
                src={"/assets/images/dark-illustration.png"}
                width={270}
                height={200}
                alt="No result illustration"
                className="hidden object-contain dark:flex"
            />
            <h2 className="h2-bold text-dark200_light900 mt-4">{title}</h2>
            <p className="body-regular text-dark500_light700 max-w-md text-center">{description}</p>
            <Link href={link}>
                <Button className="paragraph-medium rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
                    {linkTitle}
                </Button>
            </Link>
        </div>
    );
};

export default NoResult;
