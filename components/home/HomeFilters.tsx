"use client";
import React from "react";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";

const HomeFilters = () => {
    const active = "recommended";
    return (
        <div className="hidden flex-wrap gap-3 md:flex">
            {HomePageFilters.map((item) => (
                <Button
                    key={item.value}
                    onClick={() => {}}
                    className={`body-medium rounded-lg border px-6 py-3 capitalize shadow-none ${active === item.value ? "border-primary-500 bg-light-800 text-primary-500 hover:bg-light-800 dark:bg-dark-300 dark:hover:bg-dark-400" : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"}`}>
                    {item.name}
                </Button>
            ))}
        </div>
    );
};

export default HomeFilters;
