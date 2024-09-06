"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ProfileSchema } from "@/lib/validations";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";
import Field, { ProfileField } from "./Field";
interface Props {
    clerkId: string;
    user: string;
}

const Profile = ({ clerkId, user }: Props) => {
    const parsedUser = JSON.parse(user);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: parsedUser.name || "",
            username: parsedUser.username || "",
            portfolioWebsite: parsedUser.portfolioWebsite || "",
            location: parsedUser.location || "",
            bio: parsedUser.bio || "",
        },
    });

    async function onSubmit(values: z.infer<typeof ProfileSchema>) {
        setIsSubmitting(true);

        try {
            await updateUser({
                clerkId,
                updateData: {
                    name: values.name,
                    username: values.username,
                    portfolioWebsite: values.portfolioWebsite,
                    location: values.location,
                    bio: values.bio,
                },
                path: pathname,
            });

            router.back();
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const PROFILE_FIELDS: ProfileField[] = [
        {
            name: "name",
            placeholder: "Your name",
            label: "Full Name",
        },
        {
            name: "username",
            placeholder: "Your username",
            label: "Username",
        },
        {
            name: "portfolioWebsite",
            placeholder: "Your portfolio URL",
            label: "Portfolio Link",
            required: false,
            type: "url",
            classes: "text-blue-500 placeholder:text-dark300_light700",
        },
        {
            name: "location",
            placeholder: "Where are you from?",
            label: "Location",
            required: false,
        },
        {
            name: "bio",
            placeholder: "What's special about you?",
            label: "Bio",
            type: "textarea",
            containerClasses: "w-full col-span-2 xl:col-span-1 xl:col-[2/3] xl:row-[1/5] h-full",
            classes: "h-full max-h-[450px] resize-none",
        },
    ];

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-9 grid flex-col place-content-start items-start justify-start gap-9 place-self-start sm:grid-cols-2 xl:grid-cols-2">
                {PROFILE_FIELDS.map((field) => (
                    <Field key={field.name} formControl={form.control} {...field} required={field.required} />
                ))}

                <div className="col-span-2 mt-7 flex justify-end text-white  xl:col-span-2">
                    <Button type="submit" className="primary-gradient w-fit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default Profile;
