import React, {ReactNode} from "react";
import Link from "next/link";

interface ListItemProps {
    title: string;
    href: string;
    children?: ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ title, href, children }) => {

    return (
        <Link href={href}>
            <div className="w-full h-full p-3 flex flex-col gap-0.5 rounded-lg transition hover:bg-accent">
                <h1 className="text-sm font-medium">{ title }</h1>
                <div className="w-full overflow-hidden text-ellipsis line-clamp-2 opacity-80 text-[13px]">
                    { children }
                </div>
            </div>
        </Link>
    );
}