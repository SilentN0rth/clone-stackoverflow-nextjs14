"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionsSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";
import { toast } from "@/hooks/use-toast";

interface Props {
    mongoUserId: string;
    type?: "edit" | "ask";
    questionDetails?: string;
}
const Question = ({ mongoUserId, type, questionDetails }: Props) => {
    const { mode } = useTheme();
    const parsedQuestionDetails = type === "edit" && JSON.parse(questionDetails || "");
    const editorRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const form = useForm<z.infer<typeof QuestionsSchema>>({
        resolver: zodResolver(QuestionsSchema),
        defaultValues: {
            title: type === "edit" ? parsedQuestionDetails.title : "",
            explanation: type === "edit" ? parsedQuestionDetails.content : "",
            tags: type === "edit" ? parsedQuestionDetails.tags.map((tag: { name: string }) => tag.name) : [],
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
        setIsSubmitting(true);
        try {
            // make an async call to your API -> create a question
            // contain all form data
            // navigate to home page
            if (type === "edit") {
                // Edit question
                await editQuestion({
                    questionId: parsedQuestionDetails._id,
                    title: values.title,
                    content: values.explanation,
                    path: pathname,
                });
                router.push(`/question/${parsedQuestionDetails._id}`);
            } else {
                await createQuestion({
                    title: values.title,
                    content: values.explanation,
                    tags: values.tags,
                    author: JSON.parse(mongoUserId),
                    path: pathname,
                });
                router.push("/");
            }
            return toast({
                title: `Your question has been ${type === "edit" ? "edited" : "submitted"}`,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
        if (e.key === "Enter" && field.name === "tags") {
            e.preventDefault();

            const tagInput = e.target as HTMLInputElement;
            const tagValue = tagInput.value.trim();

            if (tagValue !== "") {
                if (tagValue.length > 15) {
                    return form.setError("tags", {
                        type: "required",
                        message: "Tag must be less than 15 characters",
                    });
                }

                if (!field.value.includes(tagValue as never)) {
                    form.setValue("tags", [...field.value, tagValue]);
                    tagInput.value = "";
                    form.clearErrors("tags");
                } else {
                    form.trigger();
                }
            }
        }
    };
    const handleTagRemove = (tag: string, field: any) => {
        const newTags = field.value.filter((t: string) => t !== tag);
        form.setValue("tags", newTags);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Question Title <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="no-focus paragraph-regular background-light800_dark300 text-dark300_light700 light-border-2 min-h-[56px] border"
                                    // placeholder=""
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Be specific and imagine you&apos;re asking a question to another person.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Detailed explanation of your problem <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Editor
                                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                                    onInit={(_evt, editor) => {
                                        // @ts-ignore
                                        editorRef.current = editor;
                                    }}
                                    onBlur={field.onBlur}
                                    onEditorChange={(content) => field.onChange(content)}
                                    initialValue={parsedQuestionDetails.content || ""}
                                    init={{
                                        height: 350,
                                        menubar: false,
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "preview",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "codesample",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                        ],
                                        toolbar:
                                            "undo redo | blocks | " +
                                            "codesample | bold italic forecolor | alignleft aligncenter | " +
                                            "alignright alignjustify | bullist numlist",
                                        content_style: "body { font-family:Inter; font-size:1rem }",
                                        skin: mode === "dark" ? "oxide-dark" : "oxide",
                                        content_css: mode === "dark" ? "dark" : "light",
                                    }}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Tags <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <>
                                    <Input
                                        className="no-focus paragraph-regular background-light800_dark300 text-dark300_light700 light-border-2 min-h-[56px] border"
                                        placeholder="Add tags..."
                                        disabled={type === "edit"}
                                        onKeyDown={(e) => handleInputKeyDown(e, field)}
                                    />
                                    {field.value.length > 0 && (
                                        <div className="flex-start mt-2.5 gap-2.5">
                                            {field.value.map((tag: any) => (
                                                <Badge
                                                    key={tag}
                                                    className="subtle-medium background-light800_dark300 text-light400_light500 flex cursor-pointer items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                                                    onClick={() =>
                                                        type !== "edit" ? handleTagRemove(tag, field) : () => {}
                                                    }>
                                                    <p>{tag}</p>
                                                    {type !== "edit" && (
                                                        <Image
                                                            src="/assets/icons/close.svg"
                                                            alt="Close icon"
                                                            width={12}
                                                            height={12}
                                                            className=" object-contain invert-0 dark:invert"
                                                        />
                                                    )}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </>
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Add up to 5 tags to describe what your question is about. Start typing to see
                                suggestions.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="primary-gradient w-fit !text-light-900" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>{type === "edit" ? "Editing..." : "Posting..."}</>
                    ) : (
                        <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default Question;
