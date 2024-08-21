"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import {Skeleton} from "@/components/ui/skeleton";
import useSearchSeries from "@/hooks/useSearchSeries";
import { Avatar,  AvatarFallback,  AvatarImage } from "@/components/ui/avatar";
import useAuthUser from "@/hooks/useAuthUser";
import Cookies from "js-cookie";

export const Header = () => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const { searchText, setSearchText, data } = useSearchSeries();
    const { user, loading, error } = useAuthUser();

    // console.log('Header:', user);

    useEffect(() => {
        if (data) {
            setSearchResults(data);
        } else {
            setSearchResults([]);
        }
    }, [data]);
    const handleSearch = (event: any) => {
        setSearchText(event.target.value);
    };

    const goToPage = (link: string) => {
        Cookies.set('previousPage', window.location.href, { expires: 1 });
        location.href = link;
    }

    return (
        <header className="w-full sticky top-0 flex backdrop-blur p-2 z-20">
            <div className="menu w-1/3">
                <div className="flex w-full items-center gap-2">
                    <ThemeToggle/>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button type="submit" variant={"ghost"} size={"icon"}>
                                <i className="ri-search-2-line text-xl font-bold"/>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[50%]">
                            <div className="w-full flex flex-col gap-2">
                                <div className="flex items-center justify-between gap-4">
                                    <i className="ri-search-2-line text-xl"/>
                                    <Input placeholder="Search for a series" value={searchText}
                                           onChange={handleSearch}/>
                                    <DialogClose asChild>
                                        <Button size={"icon"} variant="ghost">
                                            <i className="ri-close-line text-xl"/>
                                        </Button>
                                    </DialogClose>
                                </div>
                                <div className="w-full mt-2">
                                    {searchResults.length > 0 && (
                                        <div
                                            className="custom-scrollbar w-full max-h-[440px] overflow-x-hidden overflow-y-auto rounded-lg">
                                            {searchResults.slice(0, 10).map((result, index) => (
                                                <div key={index}
                                                     className="w-full px-[20px] py-[10px] cursor-pointer flex items-center gap-3 transition rounded-lg hover:bg-accent"
                                                     onClick={() => location.href = `/watch/${result.id}`}>
                                                    <img src={`/images/series/vertical/${result.image}`}
                                                         className="w-[40px] h-[40px] rounded-lg"
                                                         alt="Series Thumbnail"/>
                                                    <div>
                                                        <h1 className="font-semibold">{result.title}</h1>
                                                        <p className="text-sm">{result.release_year} {result.type} • {result.total_episodes} ep.</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {searchResults.length === 0 && searchText && (
                                        <div className="w-full px-[20px] py-[10px] flex items-center gap-3">
                                            <p>Not Found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="w-1/3">

            </div>
            <div className="w-1/3 flex items-center justify-end">
                {loading ? (
                    <div className="flex items-center space-x-4">
                        <div className="space-y-2 flex flex-col items-end justify-center">
                            <Skeleton className="h-3 w-[250px]"/>
                            <Skeleton className="h-3 w-[200px]"/>
                        </div>
                        <Skeleton className="h-10 w-10 rounded-full"/>
                    </div>
                ) : !user || error ? (
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" onClick={() => goToPage('/login')}>
                            Log In
                        </Button>
                        <Button variant="outline" onClick={() => goToPage('/signup')}>
                            Sign Up
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <div className="space-y-2 flex flex-col items-end justify-center">
                            <Label className="h-full md:h-3 text-sm">{user.username}</Label>
                            <Label className="hidden md:block h-3 text-xs">{user.description}</Label>
                        </div>
                        <Avatar className="h-10 w-10 rounded-full">
                            <AvatarImage src={"#"} alt="User's image"/>
                            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                )}
            </div>
        </header>
    );
};
