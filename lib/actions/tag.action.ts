"use serer";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import { PAGE_SETTINGS } from "@/constants";
export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
    try {
        connectToDatabase();
        const { userId } = params;
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        return [
            { _id: "1", name: "tag" },
            { _id: "2", name: "tag2" },
            { _id: "3", name: "tag3" },
        ];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAllTags({
    searchQuery,
    filter,
    page = PAGE_SETTINGS.page,
    pageSize = PAGE_SETTINGS.pageSizes.tags,
}: GetAllTagsParams) {
    try {
        connectToDatabase();
        const skipAmount = (page - 1) * pageSize;
        const query: FilterQuery<typeof Tag> = {};
        if (searchQuery) {
            query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
        }

        let sortOptions = {};
        switch (filter) {
            case "popular":
                sortOptions = { questions: -1 };
                break;
            case "recent":
                sortOptions = { createdOn: -1 };
                break;
            case "name":
                sortOptions = { name: 1 };
                break;
            case "old":
                sortOptions = { createdOn: 1 };
                break;
            default:
                break;
        }
        const tags = await Tag.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)
            .collation({ locale: "en" });
        const totalTags = await Tag.countDocuments(query);
        const isNext = totalTags > skipAmount + tags.length;
        return { tags, isNext };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
    try {
        connectToDatabase();
        const {
            tagId,
            searchQuery,
            page = PAGE_SETTINGS.page,
            pageSize = PAGE_SETTINGS.pageSizes.tagsQuestions,
        } = params;
        const skipAmount = (page - 1) * pageSize;
        const tagFilter: FilterQuery<ITag> = { _id: tagId };

        const tag = await Tag.findOne(tagFilter).populate({
            path: "questions",
            model: Question,
            match: searchQuery ? { title: { $regex: searchQuery, $options: "i" } } : {},
            options: {
                sort: {
                    createdAt: -1,
                },
                skip: skipAmount,
                limit: pageSize + 1,
            },
            populate: [
                { path: "tags", model: Tag, select: "_id name" },
                { path: "author", model: User, select: "_id clerkId name picture" },
            ],
        });

        if (!tag) throw new Error("Tag not found");
        const questions = tag.questions;
        const isNext = questions.length > pageSize;
        return { tagTitle: tag.name, questions, isNext };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getPopularTags() {
    try {
        connectToDatabase();
        const tags = await Tag.aggregate([
            { $project: { name: 1, questionCount: { $size: "$questions" } } },
            { $sort: { questionCount: -1 } },
            { $limit: 5 },
        ]);
        return tags;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
