import React, {ReactNode} from "react";
import { Collection } from "@/interfaces/Collection";

interface ListCollectionProps {
    children?: ReactNode;
}

export const ListCollection: React.FC<ListCollectionProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            { children }
        </div>
    );
}

interface ItemListCollectionProps {
    collection: Collection;
    checked: boolean;
}

export const ItemCollection: React.FC<ItemListCollectionProps> = ({ collection, checked }) => {
    return (
        <div className="w-full flex items-center justify-start gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition">
            <div className="size-10 rounded-full" style={{backgroundColor: collection.color}}></div>
            <div className="w-[calc(100%-40px)] flex items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-sm font-semibold">{collection.title}</h2>
                    <h3 className="text-xs opacity-80">{collection.num_series} Content</h3>
                </div>
                <div className="flex items-center">
                    <i className={`ri-check-line ${checked ? 'block' : 'hidden'}`} />
                </div>
            </div>
        </div>
    );
}