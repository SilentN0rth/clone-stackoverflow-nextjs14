import { sidebarLinks } from "@/constants";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
const LeftSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="background-light900_dark200 global-padding light-border fixed inset-y-0 left-0 flex flex-col justify-between border-r pt-36 max-sm:hidden">
            <div className="grid gap-y-5">
                {sidebarLinks.map((link) => {
                    const isActive =
                        (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    return (
                        <Link
                            key={link.route}
                            href={link.route}
                            className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center gap-4 bg-transparent p-4 max-lg:justify-center`}>
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={20}
                                height={20}
                                className={`${isActive ? "" : "invert-colors"}`}
                            />
                            <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}>{link.label}</p>
                        </Link>
                    );
                })}
            </div>
            <SignedIn>
                <SignOutButton>
                    <button className=" background-light900_dark200 text-dark300_light900 flex items-center gap-4 rounded-xl p-5 text-lg">
                        <Image
                            src={"/assets/icons/logout.svg"}
                            className="invert-colors"
                            width={20}
                            height={20}
                            alt=""
                        />
                        Logout
                    </button>
                </SignOutButton>
            </SignedIn>
            <SignedOut>
                <div className="flex flex-col gap-3">
                    <Link href={"/sign-in"}>
                        <Button className="small-medium btn-secondary w-full rounded-lg p-5 shadow-none">
                            <span className="primary-text-gradient hidden lg:inline-block">Log in</span>
                            <Image
                                src={"/assets/icons/login.svg"}
                                width={22}
                                height={22}
                                alt=""
                                className="lg:hidden"
                            />
                        </Button>
                    </Link>
                    <Link href={"/sign-up"}>
                        <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 w-full rounded-lg p-4 shadow-none">
                            <span className="hidden lg:inline-block">Sign up</span>
                            <Image
                                src={"/assets/icons/signup.svg"}
                                width={22}
                                height={22}
                                alt=""
                                className="lg:hidden"
                            />
                        </Button>
                    </Link>
                </div>
            </SignedOut>
        </aside>
    );
};

export default LeftSidebar;
