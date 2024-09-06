"use client";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

import React from "react";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
export const NavbarContent = () => {
    const pathname = usePathname();

    const { userId } = useAuth();
    return (
        <section className="flex h-full flex-col gap-6 pt-16">
            {sidebarLinks.map((link) => {
                const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                if (!userId && link.route === "/profile") {
                    return null;
                }
                return (
                    <SheetClose asChild key={link.route}>
                        <Link
                            href={link.route}
                            className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center gap-4  bg-transparent p-4`}>
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={20}
                                height={20}
                                className={`${isActive ? "" : "invert-colors"}`}
                            />
                            <p className={`${isActive ? "base-bold" : "base-medium"}`}>{link.label}</p>
                        </Link>
                    </SheetClose>
                );
            })}
        </section>
    );
};

const MobileNavbar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild className="cursor-pointer">
                <Image
                    src={"/assets/icons/hamburger.svg"}
                    alt="Menu"
                    width={36}
                    height={36}
                    className="invert-colors sm:hidden"
                />
            </SheetTrigger>
            <SheetContent
                side={"left"}
                className="custom-scrollbar overflow-y-auto border-none bg-light-900 dark:bg-dark-200">
                <Link href={"/"} className="flex items-center gap-1">
                    <Image src="/assets/images/site-logo.svg" width={23} height={23} alt="Devflow" />
                    <p className="h2-bold  text-dark100_light900 font-spaceGrotesk ">
                        Dev<span className="text-primary-500">Overflow</span>
                    </p>
                </Link>
                <div className="flex flex-col justify-between">
                    <SheetClose asChild>
                        <NavbarContent />
                    </SheetClose>
                    <SignedOut>
                        <div className="flex flex-col gap-3">
                            <SheetClose asChild>
                                <Link href={"/sign-in"}>
                                    <Button className="small-medium btn-secondary w-full rounded-lg p-6 shadow-none">
                                        <span className="primary-text-gradient">Log in</span>
                                    </Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href={"/sign-up"}>
                                    <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 w-full rounded-lg p-6 shadow-none">
                                        Sign up
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </SignedOut>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNavbar;
