"use server";
import { FilterQuery } from "mongoose";
import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
    CreateUserParams,
    DeleteUserParams,
    GetAllUsersParams,
    GetSavedQuestionsParams,
    GetUserByIdParams,
    GetUserStatsParams,
    ToggleSaveQuestionParams,
    UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";
import { PAGE_SETTINGS } from "@/constants";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

export async function getUserById(params: GetUserByIdParams) {
    try {
        connectToDatabase();

        const { userId } = params;
        const user = await User.findOne({ clerkId: userId });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createUser(userData: CreateUserParams) {
    try {
        connectToDatabase();

        const newUser = await User.create(userData);

        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateUser(params: UpdateUserParams) {
    try {
        connectToDatabase();

        const { clerkId, updateData, path } = params;

        await User.findOneAndUpdate({ clerkId }, updateData, {
            new: true,
        });

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase();

        const { clerkId } = params;

        const user = (await User.findOneAndDelete({ clerkId })) as unknown as IUser | null;

        if (!user) {
            throw new Error("User not found");
        }

        // Delete user from database
        // and questions, answers, comments, etc.

        // get user question ids
        // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

        // delete user questions
        await Question.deleteMany({ author: user._id });

        // TODO: delete user answers, comments, etc.

        const deletedUser = await User.findByIdAndDelete(user._id);

        return deletedUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAllUsers({
    searchQuery,
    filter,
    page = PAGE_SETTINGS.page,
    pageSize = PAGE_SETTINGS.pageSizes.community,
}: GetAllUsersParams) {
    try {
        const skipAmount = (page - 1) * pageSize;
        connectToDatabase();

        const query: FilterQuery<typeof User> = {};
        if (searchQuery) {
            query.$or = [
                { name: { $regex: new RegExp(searchQuery, "i") } },
                { username: { $regex: new RegExp(searchQuery, "i") } },
            ];
        }

        let sortOptions = {};
        switch (filter) {
            case "new_users":
                sortOptions = { joinedAt: -1 };
                break;
            case "old_users":
                sortOptions = { joinedAt: 1 };
                break;
            case "top_contributors":
                sortOptions = { reputation: -1 };
                break;
            default:
                break;
        }

        const users = await User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);
        const totalUsers = await User.countDocuments(query);
        const isNext = totalUsers > skipAmount + users.length;
        return { users, isNext };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
    try {
        connectToDatabase();

        const { userId, questionId, path, hasSaved } = params;

        let updateQuery = {};

        if (hasSaved) {
            updateQuery = { $pull: { saved: questionId } };
        } else if (!hasSaved) {
            updateQuery = {
                $push: { saved: questionId },
            };
        }

        const user = await User.findByIdAndUpdate(userId, updateQuery, { new: true });
        if (!user) {
            throw new Error("User not found");
        }

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
    try {
        connectToDatabase();
        const {
            clerkId,
            searchQuery,
            filter,
            page = PAGE_SETTINGS.page,
            pageSize = PAGE_SETTINGS.pageSizes.collections,
        } = params;
        const skipAmount = (page - 1) * pageSize;
        const query: FilterQuery<typeof Question> = {};
        if (searchQuery) {
            query.$or = [
                { title: { $regex: new RegExp(searchQuery, "i") } },
                { content: { $regex: new RegExp(searchQuery, "i") } },
            ];
        }

        let sortOptions = {};
        switch (filter) {
            case "most_recent":
                sortOptions = { createdAt: -1 };
                break;
            case "oldest":
                sortOptions = { createdAt: 1 };
                break;
            case "most_voted":
                sortOptions = { upvotes: -1 };
                break;
            case "most_viewed":
                sortOptions = { views: -1 };
                break;
            case "most_answered":
                sortOptions = { answers: -1 };
                break;
            default:
                break;
        }

        const user = await User.findOne({ clerkId }).populate({
            path: "saved",
            match: query,
            options: {
                sort: sortOptions,
                skip: skipAmount,
                limit: pageSize + 1,
            },
            populate: [
                { path: "tags", model: Tag, select: "_id name" },
                { path: "author", model: User, select: "_id clerkId name picture" },
            ],
        });
        if (!user) {
            throw new Error("User not found");
        }

        const savedQuestions = user.saved;
        const isNext = savedQuestions.length > pageSize;

        return { questions: savedQuestions, isNext };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserInfo(params: GetUserByIdParams) {
    try {
        connectToDatabase();

        const { userId } = params;
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            throw new Error("User not found");
        }

        const totalQuestions = await Question.countDocuments({ author: user._id });
        const totalAnswers = await Answer.countDocuments({ author: user._id });

        const [questionUpvotes] = await Question.aggregate([
            { $match: { author: user._id } },
            {
                $project: {
                    _id: 0,
                    upvotes: { $size: "$upvotes" },
                },
            },
            { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
        ]);
        const [answerUpvotes] = await Answer.aggregate([
            { $match: { author: user._id } },
            {
                $project: {
                    _id: 0,
                    upvotes: { $size: "$upvotes" },
                },
            },
            { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
        ]);
        const [questionViews] = await Answer.aggregate([
            { $match: { author: user._id } },
            { $group: { _id: null, totalViews: { $sum: "$views" } } },
        ]);

        const criteria = [
            { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
            { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
            { type: "QUESTION_UPVOTES" as BadgeCriteriaType, count: questionUpvotes?.totalUpvotes || 0 },
            { type: "ANSWER_UPVOTES" as BadgeCriteriaType, count: answerUpvotes?.totalUpvotes || 0 },
            { type: "TOTAL_VIEWS" as BadgeCriteriaType, count: questionViews?.totalViews || 0 },
        ];

        const badgeCounts = assignBadges({ criteria });

        return { user, totalQuestions, totalAnswers, badgeCounts, reputation: user.reputation };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserQuestions(params: GetUserStatsParams) {
    try {
        connectToDatabase();
        const { userId, page = PAGE_SETTINGS.page, pageSize = PAGE_SETTINGS.pageSizes.topPostsAndAnswers } = params;
        const totalQuestions = await Question.countDocuments({ author: userId });
        const skipAmount = (page - 1) * pageSize;
        const isNextQuestions = totalQuestions > page * pageSize;
        const userQuestions = await Question.find({ author: userId })
            .sort({ createdAt: -1, views: -1, upvotes: -1 })
            .skip(skipAmount)
            .limit(pageSize)
            .populate("tags", "_id name")
            .populate("author", "_id clerkId name picture");
        return { totalQuestions, questions: userQuestions, isNextQuestions };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserAnswers(params: GetUserStatsParams) {
    try {
        connectToDatabase();
        const { userId, page = PAGE_SETTINGS.page, pageSize = PAGE_SETTINGS.pageSizes.topPostsAndAnswers } = params;
        const totalAnswers = await Answer.countDocuments({ author: userId });
        const isNextAnswers = totalAnswers > page * pageSize;
        const skipAmount = (page - 1) * pageSize;
        const userAnswers = await Answer.find({ author: userId })
            .sort({ upvotes: -1 })
            .skip(skipAmount)
            .limit(pageSize)
            .populate("question", "_id title")
            .populate("author", "_id clerkId name picture");
        return { totalAnswers, answers: userAnswers, isNextAnswers };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
