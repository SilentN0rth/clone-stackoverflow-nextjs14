import React from "react";
import RenderTag from "../shared/RenderTag";
import Image from "next/image";
import Link from "next/link";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { Badge } from "lucide-react";
interface Props {
    user: {
        _id: string;
        clerkId: string;
        name: string;
        username: string;
        picture: string;
    };
}
const UserCard = async ({ user }: Props) => {
    const interactedTags = await getTopInteractedTags({ userId: user._id });
    console.log(interactedTags);
    return (
        <Link
            href={`/profile/${user.clerkId}`}
            className="shadow-light100_darknone w-full max-sx:min-w-full xs:w-[260px]">
            <article className="background-light900_dark200 light-border flex items-center flex-col justify-center rounded-2xl border p-8">
                <Image
                    src={user.picture}
                    width={100}
                    height={100}
                    className="rounded-full"
                    alt={`${user.name} profile picture`}
                />

                <div className="mt-4 text-center">
                    <h3 className="h3-bold text-dark200_light900 line-clamp-1">{user.name}</h3>
                    <p className="body-regular text-dark500_light500 mt-2">@{user.name}</p>
                </div>
                <div className="mt-5">
                    {interactedTags.length > 0 ? (
                        <div className="flex items-center gap-2">
                            {interactedTags.map((tag) => (
                                <RenderTag key={tag._id} name={tag.name} _id={tag._id} />
                            ))}
                        </div>
                    ) : (
                        <Badge>No tags yet</Badge>
                    )}
                </div>
            </article>
        </Link>
    );
};

export default UserCard;
