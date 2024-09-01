"use client";
import React, { useState } from "react";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
const HomeFilters = () => {
    const searchParams = useSearchParams();
    const [active, setActive] = useState(searchParams.get("filter") || "");
    const router = useRouter();
    const handleTypeClick = (filter: string) => {
        if (active === filter) {
            setActive("");
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "filter",
                value: null,
            });
            router.push(newUrl, { scroll: false });
        } else {
            setActive(filter);
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "filter",
                value: filter.toLowerCase(),
            });
            router.push(newUrl, { scroll: false });
        }
    };

    return (
        <div className="hidden flex-wrap gap-3 md:flex">
            {HomePageFilters.map((item) => (
                <Button
                    key={item.value}
                    onClick={() => handleTypeClick(item.value)}
                    className={`body-medium rounded-lg border px-6 py-3 capitalize shadow-none ${active === item.value ? "border-primary-500 bg-light-800 text-primary-500 hover:bg-light-800 dark:bg-dark-300 dark:hover:bg-dark-300" : "bg-light-800 text-light-500 hover:bg-light-800 dark:border-dark-400 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"}`}>
                    {item.name}
                </Button>
            ))}
        </div>
    );
};

export default HomeFilters;
