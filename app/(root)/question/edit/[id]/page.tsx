import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

const Page = async ({ params }: URLProps) => {
    const { userId } = auth();
    const mongoUser = await getUserById({ userId });
    const result = await getQuestionById({ questionId: params.id });
    return (
        <div>
            <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
            <div className="mt-9">
                <Question
                    mongoUserId={JSON.stringify(mongoUser?._id)}
                    type="edit"
                    questionDetails={JSON.stringify(result)}
                />
            </div>
        </div>
    );
};

export default Page;
