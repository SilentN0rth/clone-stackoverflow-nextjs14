"use client";

import { useTheme } from "@/context/ThemeProvider";
import React from "react";
import Image from "next/image";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { themes } from "@/constants";
const Theme = () => {
    const { mode, setMode } = useTheme();
    return (
        <Menubar className="relative border-none bg-transparent">
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200 ">
                    {mode === "light" ? (
                        <Image src="/assets/icons/sun.svg" alt="sun" width={20} height={20} className="active-theme" />
                    ) : (
                        <Image
                            src="/assets/icons/moon.svg"
                            alt="moon"
                            width={20}
                            height={20}
                            className="active-theme"
                        />
                    )}
                </MenubarTrigger>
                <MenubarContent className="absolute -right-3 mt-3 min-w-[120px]  rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
                    {themes.map((item) => (
                        <MenubarItem
                            key={item.value}
                            onClick={() => {
                                setMode(item.value);
                                item.value !== "system"
                                    ? (localStorage.theme = item.value)
                                    : localStorage.removeItem("theme");
                            }}
                            className="flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400">
                            <Image
                                className={`${mode === item.value && "active-theme"}`}
                                src={item.icon}
                                width={16}
                                height={16}
                                alt={item.value}
                            />
                            <p
                                className={`body-semibold  ${mode === item.value ? "text-primary-500" : "text-dark100_light900"}`}>
                                {item.label}
                            </p>
                        </MenubarItem>
                    ))}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default Theme;
