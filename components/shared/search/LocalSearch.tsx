"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
interface CustomInputProps {
    route: string;
    iconPosition: string;
    imgSrc: string;
    placeholder: string;
    otherClasess?: string;
}
const LocalSearch = ({ route, iconPosition, imgSrc, placeholder, otherClasess }: CustomInputProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get("q");

    const [search, setSearch] = useState(query || "");
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                const newUrl = formUrlQuery({ params: searchParams.toString(), key: "q", value: search });
                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === route) {
                    const newUrl = removeKeysFromQuery({ params: searchParams.toString(), keysToRemove: ["q"] });
                    router.push(newUrl, { scroll: false });
                }
            }
            return () => clearTimeout(delayDebounceFn);
        }, 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, router, pathname, searchParams, query]);
    return (
        <div
            className={`background-light800_darkgradient flex grow items-center gap-4 rounded-xl px-3 py-2 ${otherClasess}`}>
            {iconPosition === "left" && <Image src={imgSrc} width={24} height={24} alt="" className="cursor-pointer" />}

            <Input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-dark400_light700 paragraph-regular no-focus placeholder   border-none shadow-none outline-none"
            />
            {iconPosition === "right" && (
                <Image src={imgSrc} width={24} height={24} alt="" className="cursor-pointer" />
            )}
        </div>
    );
};

export default LocalSearch;
