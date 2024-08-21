import React, { ReactNode } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Series } from "@/interfaces/Series";

interface CardProps {
    series_info: Series;
}

export const Card: React.FC<CardProps> = ({ series_info }) => {
    const maxLength: number = 20;
    let currentLength: number = 0;

    return (
        <Link href={`/watch/${series_info.id}`}>
            <div
                className="w-full h-[160px] md:h-[200px] flex p-3 rounded-[calc(var(--radius)+12px)] transition hover:bg-accent">
                <div
                    className="w-[80px] md:w-[135px] relative flex items-center justify-center overflow-hidden rounded-lg">
                    <img src={`/images/series/vertical/${series_info.image}`} alt="..." className="w-full h-full"/>
                    <Badge className="absolute top-[5px] left-[5px]">
                        {series_info.total_episodes} ep.
                    </Badge>
                </div>
                <div
                    className="w-[calc(100%-80px)] md:w-[calc(100%-135px)] h-full p-2 md:p-4 flex flex-col justify-between gap-2 overflow-hidden">
                    <div>
                        <h1 className="text-sm xl:text-lg font-bold">{series_info.title}</h1>
                        <p className="text-[12px] xl:text-sm">{series_info.studio} • {series_info.type} • {series_info.release_year}</p>
                    </div>
                    <div
                        className="custom-scrollbar flex items-center justify-start gap-2 pb-1 overflow-x-auto">
                        {series_info.categories.map((category, index) => {
                            if (currentLength + category.length > maxLength) return;
                            currentLength += category.length;
                            return ( <Badge key={index} className="sm:text-[11px]">{category}</Badge> );
                        })}
                    </div>
                </div>
            </div>
        </Link>
    )
}

interface CardContainerProps {
    children?: ReactNode;
    title?: string;
}

export const CardContainer: React.FC<CardContainerProps> = ({ children, title }) => {
    return (
        <div className="w-full flex flex-col gap-2">
            {typeof title !== 'undefined' && (
                <h1 className="mx-3 my-1 px-2 text-2xl font-semibold w-1/2 md:w-1/4 xl:w-1/5 border-b">
                    { title }
                </h1>
            )}
            <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1 p-2">
                { children }
            </div>
        </div>
    );
}