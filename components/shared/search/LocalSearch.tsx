"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
interface CustomInputProps {
    route: string;
    iconPosition: string;
    imgSrc: string;
    placeholder: string;
    otherClasess?: string;
}
const GlobalSearch = ({ route, iconPosition, imgSrc, placeholder, otherClasess }: CustomInputProps) => {
    return (
        <div
            className={`background-light800_darkgradient flex grow items-center gap-4 rounded-xl px-3 py-2 ${otherClasess}`}>
            {iconPosition === "left" && <Image src={imgSrc} width={24} height={24} alt="" className="cursor-pointer" />}

            <Input
                type="text"
                placeholder={placeholder}
                value={""}
                onChange={() => {}}
                className=" paragraph-regular no-focus placeholder background-light800_darkgradient  border-none shadow-none outline-none"
            />
            {iconPosition === "right" && (
                <Image src={imgSrc} width={24} height={24} alt="" className="cursor-pointer" />
            )}
        </div>
    );
};

export default GlobalSearch;
