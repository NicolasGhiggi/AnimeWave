import React from "react";

interface MessageProps {
    title: string;
    text?: string;
    icon?: string;
}

export const Message: React.FC<MessageProps> = ({ title, text, icon }) => {
    return (
        <div className="w-full md:w-2/3 mx-auto flex flex-col items-center justify-center gap-4 p-6">
            {icon && (
                <i className={`${ icon } text-7xl rounded-full transition hover:bg-accent`} />
            )}
            <div className="text-center">
                <span className="text-3xl font-semibold">{ title }</span>
                {text && (
                    <p className="mt-2 text-lg text-primary opacity-80">{text}</p>
                )}
            </div>
        </div>
    );
}