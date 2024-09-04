"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchContainerRef = useRef(null);

    const query = searchParams.get("q");

    const [search, setSearch] = useState(query || "");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                // @ts-ignore
                !searchContainerRef.current.contains(event.target)
            ) {
                setSearch("");
            }
            setIsOpen(false);
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                const newUrl = formUrlQuery({ params: searchParams.toString(), key: "global", value: search });
                router.push(newUrl, { scroll: false });
            } else {
                if (query) {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["global", "type"],
                    });
                    router.push(newUrl, { scroll: false });
                }
            }
            return () => clearTimeout(delayDebounceFn);
        }, 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, router, pathname, searchParams, query]);
    return (
        <div className="relative w-full max-w-[600px] max-lg:hidden" ref={searchContainerRef}>
            <div className="background-light800_darkgradient flex-center relative flex min-h-[56px] items-center gap-1 rounded-xl px-4">
                <Image src={"/assets/icons/search.svg"} width={24} height={24} alt="" className="cursor-pointer" />

                <Input
                    type="text"
                    placeholder="Search globally"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        !isOpen && setIsOpen(true);
                        e.target.value === "" && isOpen && setIsOpen(false);
                    }}
                    className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none shadow-none outline-none"
                />
            </div>
            {isOpen && <GlobalResult />}
        </div>
    );
};

export default GlobalSearch;
