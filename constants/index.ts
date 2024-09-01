import { SidebarLink } from "@/types/index";

export const themes = [
    { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
    { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
    { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
    {
        imgURL: "/assets/icons/home.svg",
        route: "/",
        label: "Home",
    },
    {
        imgURL: "/assets/icons/users.svg",
        route: "/community",
        label: "Community",
    },
    {
        imgURL: "/assets/icons/star.svg",
        route: "/collection",
        label: "Collections",
    },
    {
        imgURL: "/assets/icons/suitcase.svg",
        route: "/jobs",
        label: "Find Jobs",
    },
    {
        imgURL: "/assets/icons/tag.svg",
        route: "/tags",
        label: "Tags",
    },
    {
        imgURL: "/assets/icons/user.svg",
        route: "/profile",
        label: "Profile",
    },
    {
        imgURL: "/assets/icons/question.svg",
        route: "/ask-question",
        label: "Ask a question",
    },
];

export const BADGE_CRITERIA = {
    QUESTION_COUNT: {
        BRONZE: 10,
        SILVER: 50,
        GOLD: 100,
    },
    ANSWER_COUNT: {
        BRONZE: 10,
        SILVER: 50,
        GOLD: 100,
    },
    QUESTION_UPVOTES: {
        BRONZE: 10,
        SILVER: 50,
        GOLD: 100,
    },
    ANSWER_UPVOTES: {
        BRONZE: 10,
        SILVER: 50,
        GOLD: 100,
    },
    TOTAL_VIEWS: {
        BRONZE: 1000,
        SILVER: 10000,
        GOLD: 100000,
    },
};

export const PAGE_SETTINGS = {
    page: 1, // default page start
    pageSizes: {
        topPostsAndAnswers: 10, // 10 posts and answers
        answers: 15, // 15 answers
        questions: 20, // 20 questions
        community: 20, // 20 users
        collections: 19, // +1 to show 20 // check if the next saved question is available
        tags: 20, // 20 tags
        tagsQuestions: 19, // +1 to show 20 // check if the next tag is available
    },
};
