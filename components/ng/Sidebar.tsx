"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import {Button} from "@/components/ui/button";
import useAuthUser from "@/hooks/useAuthUser";
import { Tooltip,  TooltipContent,  TooltipProvider,  TooltipTrigger } from "@/components/ui/tooltip"
import { LifeBuoy, LogOut, Home, BookHeart, History, Settings2, Filter, LibraryBig, Cog } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// AnimeWave
export const Sidebar = () => {
    const { user, loading, error } = useAuthUser();

    const logout = () => {
        Cookies.remove('user_data', { path: '/' });
        location.reload();
    }

    return(
        <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r bg-background overflow-y-auto sidebar">
            <div className="p-2">
                <Button variant="outline" size="icon" aria-label="Home">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="text-primary" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none" fill="currentColor">
                            <path d="M644 4993 c26 -485 176 -920 467 -1358 212 -318 473 -612 878 -988 l94 -87 -94 -87 c-405 -376 -666 -670 -878 -988 -292 -440 -442 -873 -467 -1358 l-7 -127 320 0 320 0 7 110 c8 139 37 307 73 430 l28 95 1175 0 1174 0 23 -75 c38 -124 64 -267 76 -417 l11 -143 320 0 319 0 -7 128 c-36 675 -317 1268 -908 1911 l-68 75 -22 -21 c-200 -178 -439 -396 -443 -404 -4 -5 33 -53 82 -107 49 -53 127 -142 172 -197 l82 -100 -405 -3 c-223 -1 -589 -1 -812 0 l-406 3 108 130 c148 179 519 547 889 881 619 558 857 798 1100 1109 372 477 577 967 625 1495 5 63 10 139 10 168 l0 52 -318 0 -318 0 -11 -142 c-12 -151 -38 -294 -77 -418 l-23 -75 -1174 0 -1174 0 -28 95 c-36 123 -65 291 -73 430 l-7 110 -320 0 -320 0 7 -127z m2715 -1170 c-105 -138 -250 -296 -475 -520 -151 -150 -285 -280 -299 -289 -24 -16 -27 -15 -63 12 -20 16 -154 146 -298 289 -215 214 -359 372 -463 508 -13 16 27 17 799 17 772 0 812 -1 799 -17z"/>
                        </g>
                    </svg>
                </Button>
            </div>
            <nav className="grid gap-2 p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-lg" asChild>
                                <Link href={"/"}>
                                    <Home/>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>Home</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-lg" asChild>
                                <Link href={"/filter"}>
                                    <Filter/>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>Filter</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-lg" asChild>
                                <Link href={"/history"}>
                                    <History />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>History</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-lg" asChild>
                                <Link href={"/favorites"}>
                                    <BookHeart />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>Favorites</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-lg" asChild>
                                <Link href={"/library"}>
                                    <LibraryBig />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>Library</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-lg" asChild>
                                <Link href={"/settings"}>
                                    <Settings2 />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {user?.is_admin ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-lg" asChild>
                                    <Link href={"/management"}>
                                        <Cog/>
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>Management</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (<></>)}
            </nav>
            <nav className="grid gap-2 p-2 mt-auto">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-lg" asChild>
                                <Link href={"/help"}>
                                    <LifeBuoy />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>Help</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-lg" disabled={!user}>
                                        <LogOut />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will log you out of your account.
                                            You will be able to access again by logging in.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>Logout</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
}