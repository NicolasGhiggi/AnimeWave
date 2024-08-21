import React, { ReactNode } from "react";
import Link from "next/link";
import { Series } from "@/interfaces/Series";
import { Badge } from "@/components/ui/badge";
import { Episode } from "@/interfaces/Episode";
import "@/node_modules/@fortawesome/fontawesome-free/css/all.css";

interface CoverProps {
    info: Series|Episode;
}

export const Cover: React.FC<CoverProps> = ({ info }) => {
    let currentLength = 0;
    let maxLength = 20;

    const isSeries = (info: Series | Episode): info is Series => {
        return (info as Series).total_episodes !== undefined && info.categories !== undefined;
    };

    const categories = (info as Series).categories || (info as Episode).categories || [];

    return (
        <Link href={`/watch/${info.id}`} className="hover:bg-accent transition cover w-[90%] md:w-[250px] mx-auto">
            <div className="flex flex-col gap-2 p-3 w-full">
                <div className="relative">
                    <img src={`/images/series/vertical/${info.image}`} alt={info.title}
                         className="rounded-lg w-full h-[400px] md:h-[335px] shadow-lg"/>
                    <Badge className="absolute top-2 left-2">
                        {isSeries(info) ? `${info.total_episodes} ep.` : `Episode ${info.episode_number}`}
                    </Badge>
                </div>
                <div className="space-x-1">
                    {categories.map((category, index) => {
                        if (currentLength + category.length > maxLength) {
                            return;
                        }
                        currentLength += category.length;
                        return (
                            <Badge key={index}>{category}</Badge>
                        );
                    })}
                </div>
                <div>
                    <h2 className="text-xl font-bold">{info.title}</h2>
                </div>
            </div>
        </Link>
    );
};

interface CoverContainerProps {
    children?: ReactNode;
    title?: string;
}

export const CoverContainer: React.FC<CoverContainerProps> = ({children, title}) => {
    return (
        <div className="w-full flex flex-col gap-2 px-2 pt-6 md:px-10 md:pt-20">
            {title && (
                <h1 className="md:mx-3 my-1 px-2 text-2xl font-semibold w-full md:w-1/3 xl:w-1/5 border-b">
                    {title}
                </h1>
            )}
            <div
                className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {children}
            </div>
        </div>
    );
};
