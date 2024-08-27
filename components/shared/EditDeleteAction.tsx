"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { deleteQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { deleteAnswer } from "@/lib/actions/answer.action";
interface Props {
    type: string;
    itemId: string;
}

export const EditDeleteAction = ({ type, itemId }: Props) => {
    const path = usePathname();
    const router = useRouter();
    const handleEdit = () => {
        router.push(`/question/edit/${itemId}`);
    };
    const handleDelete = async () => {
        if (type === "Question") {
            await deleteQuestion({ questionId: itemId, path });
        } else if (type === "Answer") {
            await deleteAnswer({ answerId: itemId, path });
        }
    };
    return (
        <div className="flex items-center justify-end ">
            {type === "Question" && (
                <Button onClick={handleEdit}>
                    <Image src={"/assets/icons/edit.svg"} width={14} height={14} alt="" className="object-contain" />
                </Button>
            )}
            <Button onClick={handleDelete}>
                <Image src={"/assets/icons/trash.svg"} width={14} height={14} alt="" className="object-contain" />
            </Button>
        </div>
    );
};
